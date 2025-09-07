export type Rule = {
  name: string;
  pattern: RegExp;
  handler: (m: RegExpMatchArray, original: string) => string;
  priority: number; // higher = earlier
};

export const rules: Rule[] = [];

rules.push(
  {
    name: "GREET",
    priority: 100,
    pattern:
      /\b(hai|halo|helo|hello|ass?alamualaikum|pagi|siang|sore|malam|hey)\b/i,
    handler: () =>
      choose([
        introduce(),
        "Halo! Ada yang bisa saya bantu seputar bambu hari ini?",
      ]),
  },
  {
    name: "HELP",
    priority: 95,
    pattern: /\b(bantu|tolong|help|bisa apa|cara pakai|panduan)\b/i,
    handler: () => `${introduce()} ${askNarrow()}`,
  },
  {
    name: "FAQ.MANFAAT",
    priority: 90,
    pattern:
      /\b(manfaat|kegunaan|keunggulan)\b.*\bbambu\b|\bbambu\b.*\b(manfaat|kegunaan|keunggulan)\b/i,
    handler: () =>
      choose([
        "Manfaat bambu: bahan bangunan ramah lingkungan, furnitur/mebel, kerajinan, bioenergi, serta konservasi tanah & air.",
        "Bambu tumbuh cepat, jejak karbon rendah, kuat & fleksibel—cocok untuk mebel, anyaman, hingga panel bangunan.",
      ]),
  },
  {
    name: "FAQ.PERAWATAN",
    priority: 90,
    pattern:
      /\b(rawat|perawatan|hama|penyakit|pemupukan|penyiraman|pangkas|pruning)\b.*\bbambu\b/i,
    handler: () =>
      "Perawatan: siram teratur (tidak becek), pupuk NPK tiap 2–3 bulan, pangkas rebung lemah, kendali hama mekanis + bio-pestisida.",
  },
  {
    name: "FAQ.PENANAMAN",
    priority: 90,
    pattern:
      /\b(tanam|menanam|bibit|stek|rimpang|jarak tanam|media tanam|lahan)\b.*\bbambu\b/i,
    handler: () =>
      "Gunakan bibit sehat (stek/rimpang), jarak 3–5 m sesuai varietas, tanah gembur & drainase baik, tambah mulsa organik.",
  },
  {
    name: "FAQ.PRODUK",
    priority: 85,
    pattern:
      /\b(produk|kerajinan|mebel|anyam(an)?|panel|dekorasi|ukm|ide)\b.*\bbambu\b/i,
    handler: () =>
      choose([
        "Ide: anyaman (keranjang/tikar), mebel (kursi/meja), dekorasi (lampu/pot), panel dinding, sedotan bambu.",
        "Mulai: riset tren lokal, buat contoh kecil, uji sambungan/finishing, foto & jual via medsos/toko lokal.",
      ]),
  },
  {
    name: "FAQ.PASAR",
    priority: 85,
    pattern:
      /\b(pasar|jual|harga|pemasaran|permintaan|market|jualan|menjual)\b.*\bbambu\b/i,
    handler: () =>
      "Pemasaran: foto rapi, storytelling asal-usul, titip jual di toko oleh-oleh, promosi di WA/FB/IG/TikTok, ikut bazar UMKM.",
  },
  {
    name: "FAQ.PELATIHAN",
    priority: 85,
    pattern: /\b(pelatihan|kelas|workshop|pendampingan|diklat)\b.*\bbambu\b/i,
    handler: () =>
      "Topik pelatihan: budidaya dasar, pengeringan, finishing/anti-rayap, desain produk, pemasaran digital (praktik kelompok).",
  }
);

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
