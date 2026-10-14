import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI client securely on backend
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API status endpoint
app.get('/api/tts/status', (req, res) => {
  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
    service: 'gemini-3.8-flash-lite-tts',
    characters: {
      teacher: { voice: 'Kore', label: 'Cô Ngô Thị Hà (Nữ trưởng thành, mô phạm)' },
      minh: { voice: 'Puck', label: 'Bạn Minh (Bé trai 10-11 tuổi, hồn nhiên)' },
      an: { voice: 'Zephyr', label: 'Bạn An (Bé gái 10-11 tuổi, nhẹ nhàng)' },
    },
  });
});

// Secure Backend TTS endpoint using Gemini Flash Lite TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, character } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ai) {
      return res.status(503).json({
        success: false,
        fallback: 'webspeech',
        message: 'No GEMINI_API_KEY available on server. Falling back to high-fidelity Web Speech API.',
      });
    }

    // Select character voice
    let voiceName = 'Aoede'; // warm, gentle female teacher
    if (character === 'minh') {
      voiceName = 'Puck'; // boy student
    } else if (character === 'an') {
      voiceName = 'Zephyr'; // girl student
    }

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

    // Return as base64 audio/wav
    res.json({
      success: true,
      audioData: `data:audio/wav;base64,${base64Audio}`,
      character,
      voiceName,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Backend TTS Error:', err.message || error);
    res.status(500).json({
      success: false,
      fallback: 'webspeech',
      error: err.message || 'TTS generation failed',
    });
  }
});

// Setup Vite or Static File serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
