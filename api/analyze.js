const MINIMAX_API_URL = "https://api.minimax.chat/v1/chat/completions";

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return response.status(500).json({
      error: "Server missing MINIMAX_API_KEY environment variable.",
    });
  }

  try {
    const { report } = request.body || {};
    if (!report || !report.type) {
      return response.status(400).json({ error: "Missing report payload." });
    }

    const upstream = await fetch(MINIMAX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.MINIMAX_MODEL || "MiniMax-M1",
        messages: [
          {
            role: "system",
            content:
              "你是一名严谨但表达生动的人格测评分析助手。不要输出思考过程，不要输出 <think> 标签。不要声称这是官方 MBTI 认证，也不要做临床诊断。只返回合法 JSON，格式为 {\"summary\":\"...\",\"fullAnalysis\":\"...\"}。summary 用 120-180 字，fullAnalysis 用中文分段，包含优势、风险、学习/工作/关系建议。",
          },
          {
            role: "user",
            content: buildPrompt(report),
          },
        ],
        temperature: 0.55,
        max_tokens: 2400,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return response.status(upstream.status).json({
        error: data.error?.message || data.base_resp?.status_msg || "MiniMax API request failed.",
      });
    }

    const raw = stripThink(
      data.choices?.[0]?.message?.content || data.choices?.[0]?.text || data.reply || ""
    );
    const parsed = parseAiJson(raw);

    return response.status(200).json({
      summary: stripThink(parsed.summary || makeSummary(raw)),
      fullAnalysis: stripThink(parsed.fullAnalysis || raw),
    });
  } catch (error) {
    return response.status(500).json({ error: error.message || "AI analysis failed." });
  }
};

function stripThink(text) {
  return String(text || "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, "")
    .replace(/<think>[\s\S]*$/gi, "")
    .trim();
}

function parseAiJson(text) {
  const clean = stripThink(text).replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(clean);
  } catch (_) {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch (__) {
      return {};
    }
  }
}

function makeSummary(text) {
  const clean = stripThink(text).replace(/\s+/g, " ").trim();
  return clean.length > 220 ? `${clean.slice(0, 220)}...` : clean;
}

function buildPrompt(report) {
  const dims = Object.entries(report.dimensions || {})
    .map(([key, value]) => `${key}: ${value.letter}, 强度 ${value.strength}%, 一致性 ${value.consistency}%`)
    .join("\n");

  const subScores = Object.entries(report.subScores || {})
    .map(([key, facets]) => {
      const rows = facets
        .map((facet) => `${facet.name}: ${facet.pole} (${facet.letter}, ${facet.strength}%)`)
        .join("; ");
      return `${key}: ${rows}`;
    })
    .join("\n");

  const consistency = report.consistencyReport || {};

  return `
请基于以下 MBTI 风格的原创自评结果生成分析。不要输出思考过程，不要输出 <think> 标签。必须只返回 JSON：
{"summary":"120-180 字摘要，只说最重要结论","fullAnalysis":"完整分析，分段输出"}

类型：${report.type}
可信度：${report.confidence}
总体画像：${report.summary}

四维度：
${dims}

维度子分：
${subScores}

反应一致性：
- 总体一致性：${consistency.overall}%
- 维度内部一致：${consistency.dimensionAverage}%
- 成对题一致：${consistency.pairConsistency}%
- 中立作答：${consistency.neutralRate}%
- 极端作答：${consistency.extremeRate}%
- 同意偏向：${consistency.biasLabel} (${consistency.agreementBias})

已有优势：
${(report.strengths || []).map((item) => `- ${item}`).join("\n")}

已有成长提醒：
${(report.growth || []).map((item) => `- ${item}`).join("\n")}

fullAnalysis 请包含：
1. 总体解读
2. 最值得相信的三个结论
3. 需要谨慎解读的两个地方
4. 学习、工作、关系三个场景建议
5. 一句轻幽默总结
`.trim();
}