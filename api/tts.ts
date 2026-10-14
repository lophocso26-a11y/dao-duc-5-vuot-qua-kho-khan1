import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, character } = req.body || {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        fallback: 'webspeech',
        message: 'No GEMINI_API_KEY configured in environment.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Voice selection:
    // Teacher: Aoede / Kore (warm, natural female adult teacher)
    // Minh: Puck (energetic, clear boy)
    // An: Zephyr (sweet, clear girl)
    let voiceName = 'Aoede';
    if (character === 'minh') {
      voiceName = 'Puck';
    } else if (character === 'an') {
      voiceName = 'Zephyr';
    }

    // Call Gemini TTS with gemini-3.8-flash-tts
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: text.trim() }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(502).json({
        success: false,
        fallback: 'webspeech',
        message: 'TTS generation returned empty audio data.',
      });
    }

    return res.status(200).json({
      success: true,
      audioData: `data:audio/wav;base64,${base64Audio}`,
      character,
      voiceName,
    });
  } catch (error: any) {
    console.error('Vercel TTS API Error:', error?.message || error);
    return res.status(500).json({
      success: false,
      fallback: 'webspeech',
      error: error?.message || 'TTS generation failed',
    });
  }
}
