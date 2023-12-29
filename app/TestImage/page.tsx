import OpenAI from "openai";

const TestImage = (pronpts:string)=>{
  const openai = new OpenAI();

  async function generateImage() {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: pronpts });

    console.log(image.data);
  }
  generateImage();
}

export default TestImage