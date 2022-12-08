import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.question),
    temperature: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(question) {
  return `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".

  Q: What is human life expectancy in the United States?
  A: Human life expectancy in the United States is 78 years.
  
  Q: Who was president of the United States in 1955?
  A: Dwight D. Eisenhower was president of the United States in 1955.
  
  Q: Which party did he belong to?
  A: He belonged to the Republican Party.
  
  Q: What is the square root of banana?
  A: Unknown
  
  Q: How does a telescope work?
  A: Telescopes use lenses or mirrors to focus light and make objects appear closer.
  
  Q: Where were the 1992 Olympics held?
  A: The 1992 Olympics were held in Barcelona, Spain.
  
  Q: How many squigs are in a bonk?
  A: Unknown
  
  Q: ${question}
  A:`;
}
