import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prompt = req.body.prompt;
    const level = req.body.level;

    // GPT-4 APIリクエストの設定
    const gptResponse = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview", // GPT-4モデルの指定
        messege: [
          {
            role: "user",
            contnt:[
              { type: "text", text: "create cat image" },
            ]  
          }
          
      ],
        max_tokens: 100 // 必要なトークン数（調整が必要かもしれません）
      })
    });

    const gptData = await gptResponse.json();

    // 必要に応じて、ここでDALL-E APIを呼び出して画像を生成する
    // ...

    res.status(200).json(gptData);
}
