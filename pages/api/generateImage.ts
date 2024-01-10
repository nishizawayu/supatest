// pages/api/generateImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { prompts } = req.body;
      const apiKey = process.env.OPENAI_API_KEY; // 環境変数からAPIキーを取得

      if (!apiKey) {
        throw new Error('The OPENAI_API_KEY environment variable is not set.');
      }

      const openai = new OpenAI({ apiKey });

      const response = await openai.images.generate({
        model: "dall-e-3", 
        prompt: prompts,
        response_format: "b64_json",
        size: "1024x1024",
        n: 1,
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from OpenAI');
      }
      const imageData = response.data.map(item => item.b64_json);
      res.status(200).json({ imageData });
    } catch (error) {
      console.error('Error in /api/generateImage:', error);
      // @ts-ignore
      res.status(500).json({ error: 'Error generating image', details: error.message });
    }
}
