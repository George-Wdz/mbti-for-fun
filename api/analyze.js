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
              "你是一名严谨但表达生动的人格测评分析助手。不要声称这是官方 MBTI 认证，也不要做临床诊断。基于用户的非官方自评结果，输出中文分析，语气神秘、幽默、克制。重点解释维度强度、子分、反应一致性、优势、风险和具体建议。",
          },
          {
            role: "user",
            content: buildPrompt(report),
          },
        ],
        temperature: 0.65,
        max_tokens: 1200,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return response.status(upstream.status).json({
        error: data.error?.message || data.base_resp?.status_msg || "MiniMax API request failed.",
      });
    }

    const analysis =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.text ||
      data.reply ||
      "";

    return response.status(200).json({ analysis });
  } catch (error) {
    return response.status(500).json({ error: error.message || "AI analysis failed." });
  }
};

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
请基于以下 MBTI 风格的原创自评结果生成深度分析：

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

请输出：
1. 300 字以内总体解读
2. 三条最值得相信的结论
3. 两条需要谨慎解读的地方
4. 学习/工作/关系三个场景建议
5. 一句轻幽默总结
`.trim();
}
