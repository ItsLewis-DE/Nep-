import { GoogleGenAI } from '@google/genai';

/**
 * Shared Gemini client instance configured exclusively on the server side.
 * Never exposed to browser or client bundles.
 */
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});
