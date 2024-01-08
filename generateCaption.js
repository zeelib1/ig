const OpenAI = require("openai");
require("dotenv").config();
const prompt = require("./generatePrompt");

const openai = new OpenAI({ apiKey: process.env.OPENAPI_KEY });
async function generateCaption() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate a positive and optimistic saying with emojis of positivity. Add couple of positive hashtags with funny vibe, and try focusing on the words: ${prompt} -  to follow the image atmosphere`,
      },
    ],
    max_tokens: 450, // Set the limit here

    model: "gpt-3.5-turbo",
  });
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

module.exports = generateCaption;
