// import seveimage from "../seveImage/seveImage";
"use server"
import insertimagedata from "./insert";
// @ts-ignore
const TestImage = async(prompts,tid,level) => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://hyouka-app.vercel.app' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/generateImage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts }),
    });
  
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
      throw new Error(`Server error: ${response.status}`);
    }
  
    const imageData = await response.json();

    const imageBufferBase64 = imageData.imageData[0];

    const imageBuffer = Buffer.from(imageBufferBase64, 'base64');

    const sharp = require('sharp');
    try {
      const compressedBuffer = await sharp(imageBuffer)
        .resize(800, 800)
        .toFormat('jpeg', { quality: 80 })
        .toBuffer();

      const compressedBase64 = compressedBuffer.toString('base64');
      const baseUrl = process.env.NODE_ENV === 'production' ? 'https://hyouka-app.vercel.app' : 'http://localhost:3000';
      // APIルートを呼び出し、圧縮された画像をサーバーに保存
      const saveimage = await fetch(`${baseUrl}/api/saveImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBufferBase64: compressedBase64, tid,level }),
      });
      const result = await saveimage.json();
      if(result != null){
        insertimagedata(result.imagePathdata, tid);
      }  
    } catch (err) {
      console.error('Error compressing image:', err);
    }
    } catch (error) {
  console.error("Error generating image:", error);
  }
}

export default TestImage;
