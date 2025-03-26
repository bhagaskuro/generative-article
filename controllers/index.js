import dotenv from 'dotenv';
import { createClient } from 'pexels';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const client = createClient(process.env.PEXELS_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

class Controller {
  static async request(req, res, next) {
    try {
      const input = req.body.keyword;

      // Generate foto dari Pexels
      const generated = await client.photos.search({
        query: input,
        per_page: 1,
      });
      const pictures = generated.photos.map((photo) => ({
        id: photo.id,
        url: photo.src.original,
      }));

      // Generate artikel dari Gemini AI
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Buatkan artikel pendek (200-300 kata) mengenai ${input}`,
      });
      const article =
        `<img src="${pictures[0].url}" alt="${input}">` + response.text;

      res.status(201).json(article);
    } catch (error) {
      next(error);
    }
  }
}

export default Controller;
