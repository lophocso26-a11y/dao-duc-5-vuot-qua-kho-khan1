import fs from 'fs';
import path from 'path';

function createWavBuffer(durationSec = 1.5, freq = 440, sampleRate = 22050) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = Math.floor(sampleRate * durationSec);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const totalSize = 36 + dataSize;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(totalSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write sine wave with smooth attack/decay
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.sin((Math.PI * i) / numSamples); // smooth bell envelope
    const sample = Math.sin(2 * Math.PI * freq * t) * env * 0.3 * 32767;
    buffer.writeInt16LE(Math.floor(sample), 44 + i * 2);
  }

  return buffer;
}

const dirs = [
  'public/audio/teacher',
  'public/audio/minh',
  'public/audio/an',
  'public/audio/effects',
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Create sound effect files
fs.writeFileSync('public/audio/effects/chime.wav', createWavBuffer(0.8, 523.25));
fs.writeFileSync('public/audio/effects/reflect.wav', createWavBuffer(0.6, 440));
fs.writeFileSync('public/audio/effects/fanfare.wav', createWavBuffer(1.8, 659.25));

console.log('Audio directories and initial effect sound files successfully generated!');
