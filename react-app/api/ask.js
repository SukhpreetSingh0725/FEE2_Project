import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ reply: "OpenAI server error" });
  }
}
