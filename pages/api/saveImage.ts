// pages/api/saveImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import insertimagedata from '@/app/(Slider)/TestImage/insert';

// pages/api/saveImage.ts
// ...

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { imageBufferBase64, tid ,level } = req.body;

      if (!imageBufferBase64) {
        return res.status(400).json({ error: 'Invalid or missing image data' });
      }

      try {
        const imageBuffer = Buffer.from(imageBufferBase64, 'base64');
        const imagePath = path.join(process.cwd(), '/public/image', `image_${tid}_${level}.jpg`);
        const imagePathdata = `image_${tid}_${level}.jpg`

        // ディレクトリの存在を確認し、存在しなければ作成
        const dirPath = path.dirname(imagePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(imagePath, imageBuffer);
        res.status(200).json({ message: 'Image saved successfully',imagePathdata});
      } catch (error) {
        console.error('Error saving the image:', error);
        res.status(500).json({ error: 'Error saving the image' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
