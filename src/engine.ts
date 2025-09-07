export type Rule = {
  name: string;
  pattern: RegExp;
  handler: (m: RegExpMatchArray, original: string) => string;
  priority: number; // higher = earlier
};

export const rules: Rule[] = [];

// --- Reflection (ELIZA-style) ---
const reflectionPairs: [RegExp, string][] = [
  [/\bI\b/gi, "you"],
  [/\bme\b/gi, "you"],
  [/\bmy\b/gi, "your"],
  [/\bmine\b/gi, "yours"],
  [/\bmyself\b/gi, "yourself"],
  [/\bam\b/gi, "are"],
  [/\byou\b/gi, "I"],
  [/\byour\b/gi, "my"],
  [/\byours\b/gi, "mine"],
  [/\byourself\b/gi, "myself"],
  [/\bare\b/gi, "am"],
  [/\bsaya\b/gi, "kamu"],
  [/\baku\b/gi, "kamu"],
  [/\bpunyaku\b/gi, "punyamu"],
  [/\bpunyamu\b/gi, "punyaku"],
  [/\bmilikku\b/gi, "milikmu"],
  [/\bmilikmu\b/gi, "milikku"],
  [/\bdiriku\b/gi, "dirimu"],
  [/\bdirimu\b/gi, "diriku"],
  [/\bkam(u|i)\b/gi, "saya"],
];

const preserveCase = (repl: string, original: string) => {
  if (!original) return repl;
  if (original.toUpperCase() === original) return repl.toUpperCase();
  if (original[0] === original[0].toUpperCase()) {
    return repl[0].toUpperCase() + repl.slice(1);
  }
  return repl;
};

const reflect = (text: string): string => {
  let out = text;
  for (const [regex, repl] of reflectionPairs) {
    out = out.replace(regex, (m) => preserveCase(repl, m));
  }
  return out.trim();
};

const choose = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Helpers ---
const introduce = () =>
  "Halo! Saya Bambot. Saya bisa bantu info seputar bambu: manfaat, penanaman, perawatan, produk, pasar, dan pelatihan. Tanyakan saja 🙂";
const askNarrow = () =>
  "Boleh dipersempit? Misalnya: *manfaat*, *cara menanam*, *perawatan*, *ide produk*, *cara menjual*, atau *pelatihan*.";

export const respond = (input: string): string => {
  const trimmed = input.trim();
  for (const rule of [...rules].sort((a, b) => b.priority - a.priority)) {
    const m = trimmed.match(rule.pattern);
    if (m) return rule.handler(m, trimmed);
  }
  return "Ceritakan lebih lanjut.";
};
