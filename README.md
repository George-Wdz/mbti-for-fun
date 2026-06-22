# MBTI 人格偏好测评 Web 应用

这是一个可直接打开的静态 Web 应用，包含 108 道原创平衡题项、四维度评分、结果画像、维度强度、维度子分、可信度和一致性说明。

## 使用方式

直接用浏览器打开 `index.html` 即可运行。

## 说明

本工具用于自我理解和沟通参考，不是官方 MBTI 认证测评，也不用于临床诊断。

## AI 深度分析

前端会调用 `/api/analyze`。这个接口需要部署到支持 Serverless Functions 的平台，例如 Vercel。

在 Vercel 项目环境变量中设置：

```text
MINIMAX_API_KEY=你的 MiniMax token
```

可选模型变量：

```text
MINIMAX_MODEL=MiniMax-M1
```

不要把 MiniMax token 写进 `app.js` 或其他前端文件。GitHub Pages 只能托管静态页面，不能运行 `/api/analyze`。
