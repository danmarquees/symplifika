import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error(
    "Chave da API OpenAI não configurada. Configure a variável de ambiente OPENAI_API_KEY.",
  );
}

const openai = new OpenAI({
  apiKey: openaiApiKey, // Chave de API do OpenAI (configure o .env)
});

export const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    if (!openaiApiKey) {
      return res
        .status(500)
        .json({ msg: "Chave da API OpenAI não configurada no servidor." });
    }

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 150, // Ajuste conforme necessário
    });

    console.log(response);

    const generatedText = response.choices[0].text.trim();
    res.json({ text: generatedText });
  } catch (error) {
    console.error("Erro ao gerar texto:", error);

    // Tratar erros específicos da API OpenAI
    if (error.name === "OpenAIAPIError") {
      return res.status(500).json({
        msg: "Erro na API OpenAI",
        error: error.message,
        type: error.type,
        code: error.code,
      });
    }

    // Tratar outros erros
    res.status(500).json({ msg: "Erro ao gerar texto", error: error.message });
  }
};
