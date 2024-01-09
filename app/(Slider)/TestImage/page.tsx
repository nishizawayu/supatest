import OpenAI from "openai";
import insertteamdata from "./insert";

// @ts-ignore
const TestImage = async(prompts, tid) => {
  const apiKey = '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';
  const openai = new OpenAI({apiKey:apiKey});
  try {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: prompts });

    console.log(image.data);
    // 画像のURLがあれば、それをサーバーに送ります
    if(image.data[0]?.url) {
      insertteamdata(image.data[0].url, tid)
    }
  } catch (error) {
    // エラーをログに出力
    console.error("Error generating image:", error);
  }
}

export default TestImage;
