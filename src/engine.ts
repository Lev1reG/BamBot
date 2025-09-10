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
        "Halo! Ada yang bisa saya bantu seputar bambu hari ini? Kita bisa bahas manfaat, cara menanam/merawat, ide produk, pemasaran, dan pelatihan.",
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
        choose([
          "Berikut gambaran manfaat bambu yang relevan untuk desa: (1) Ekonomi—produk bernilai tambah (mebel, anyaman, dekorasi); (2) Lingkungan—serapan CO₂ baik & konservasi tanah/air; (3) Material—kuat, lentur, dan lebih ramah lingkungan; (4) Sosial/budaya—mengangkat kearifan lokal.",
          "Manfaat bambu: bahan baku produk kreatif (UMKM), pertumbuhan cepat (lebih cepat panen), jejak karbon rendah, dan memperkuat citra lokal. Cocok untuk produk fungsional maupun dekoratif.",
        ]),
      ]),
  },
  {
    name: "FAQ.PERAWATAN",
    priority: 90,
    pattern:
      /\b(rawat|perawatan|hama|penyakit|pemupukan|penyiraman|pangkas|pruning)\b.*\bbambu\b/i,
    handler: () =>
      "Perawatan praktis: (1) Siram rutin tapi jangan becek; (2) Pupuk NPK ringan tiap 2-3 bulan + kompos/mulsa; (3) Pangkas rebung/ruas lemah agar sirkulasi bagus; (4) Hama/penyakit—mulai dari mekanis, lanjut bio-pestisida bila perlu; (5) Jaga kebersihan rumpun.",
  },
  {
    name: "FAQ.PENANAMAN",
    priority: 90,
    pattern:
      /\b(tanam|menanam|bibit|stek|rimpang|jarak tanam|media tanam|lahan)\b.*\bbambu\b/i,
    handler: () =>
      "Panduan ringkas: gunakan bibit sehat (stek/rimpang), jarak tanam umumnya 3-5 m (tergantung varietas & kepadatan), tanah gembur berdrainase baik, tambah kompos & mulsa. 2-4 minggu awal, jaga kelembapan & pantau daun.",
  },
  {
    name: "FAQ.PRODUK",
    priority: 85,
    pattern:
      /\b(produk|kerajinan|mebel|anyam(an)?|panel|dekorasi|ukm|ide)\b.*\bbambu\b/i,
    handler: () =>
      choose([
        "Berikut contoh beberapa ide yang dapat langsung dicoba: (1) Anyaman—keranjang, tatakan, tudung saji; (2) Mebel mini—stool, rak dinding/tanaman; (3) Dekorasi—lampu meja/dinding, bingkai foto, pot cover; (4) Perlengkapan makan—sendok kayu+bambu, sedotan (finishing food-safe). Langkah mulai: riset selera lokal, buat 1-2 prototipe, foto rapi, uji harga di pasar/online, kumpulkan feedback, lalu produksi kecil bertahap.",
        "Ide produk pemula: anyaman sederhana, rak tanaman, lampu hias, dan aksesori meja. Kunci awal: sambungan kuat, finishing halus, dan foto yang menjual.",
      ]),
  },
  {
    name: "FAQ.PASAR",
    priority: 85,
    pattern:
      /\b(pasar|jual|harga|pemasaran|permintaan|market|jualan|menjual)\b.*\bbambu\b/i,
    handler: () =>
      "Pemasaran efektif: (1) Bangun cerita produk (lokal, ramah lingkungan, dampak sosial); (2) Foto & katalog rapi (ukuran, harga, paket bundling); (3) Kanal—titip di toko oleh-oleh, promosi WA/FB/IG/TikTok, coba pre-order; (4) Harga—catat bahan/waktu kerja & margin, uji beberapa harga; (5) Pelanggan ulang—minta ulasan & berikan kode diskon.",
  },
  {
    name: "FAQ.PELATIHAN",
    priority: 85,
    pattern: /\b(pelatihan|kelas|workshop|pendampingan|diklat)\b.*\bbambu\b/i,
    handler: () =>
      "Rancangan pelatihan singkat: (1) Potensi bambu & peluang ekonomi; (2) Teknik budidaya, panen, pengeringan; (3) Praktik membuat 1 produk (anyaman/mebel mini) + safety alat; (4) Finishing/anti-rayap & QC; (5) Pemasaran digital (foto, caption, harga, pre-order). Siapkan modul ringkas & daftar alat supaya peserta bisa langsung praktik di rumah.",
  },
  {
    name: "LOCALE.JAWA",
    priority: 80,
    pattern: /\b(piye|opo|ngene|kowe|aku|kok|ndak|ora|nggih)\b/i,
    handler: () =>
      "Monggo 🙂. Menawi saged dipunperjelas: manfaat, penanaman, perawatan, ide produk, pemasaran, utawi pelatihan bambu?",
  },
  {
    name: "SMALLTALK",
    priority: 50,
    pattern:
      /\b(capek|lelah|bingung|semangat|mantap|keren|wow|bagus|terima kasih|makasih)\b/i,
    handler: (m) =>
      choose([
        `Kenapa kamu merasa ${reflect(m[0])}? Ceritakan sedikit.`,
        "Terima kasih! Ada topik bambu tertentu yang ingin dibahas?",
      ]),
  },
  {
    name: "ABUSE/SAFETY",
    priority: 40,
    pattern:
      /\b(bodoh|goblok|anjir|anjing|k\**g|t*l*l|bacot|bangsat|kampret)\b/i,
    handler: () =>
      "Aku di sini untuk membantu. Bila ada yang kurang pas, beri tahu topik bambu yang kamu butuhkan, aku akan jelaskan lebih baik.",
  },
  {
    name: "OUT_OF_SCOPE",
    priority: 30,
    pattern:
      /\b(sepak\s*bola|game|crypto|kripto|motor|film|musik|kuliah|matkul|AI(?!.*bambu))\b/i,
    handler: () =>
      "Fokusku edukasi bambu. Coba tanya soal manfaat, penanaman, perawatan, ide produk, pemasaran, atau pelatihan bambu, aku siap bantu.",
  },
  {
    name: "FALLBACK",
    priority: 0,
    pattern: /([\s\S]+)/,
    handler: (_m, original) =>
      `Kamu bilang: “${reflect(original)}”. Bisa dirinci agar aku bisa bantu?`,
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
  "Halo! Saya Bambot. Saya bisa bantu info seputar bambu mulai dari manfaat, penanaman, perawatan, ide produk, pemasaran, sampai pelatihan. Silakan tanya topik yang kamu butuhkan ya 🙂";
const askNarrow = () =>
  "Biar fokus, boleh dipersempit: misalnya *manfaat bambu*, *cara menanam*, *cara merawat*, *ide produk yang laku*, *cara menjual & riset harga*, atau *pelatihan yang cocok untuk warga*.";

export const respond = (input: string): string => {
  const trimmed = input.trim();
  for (const rule of [...rules].sort((a, b) => b.priority - a.priority)) {
    const m = trimmed.match(rule.pattern);
    if (m) return rule.handler(m, trimmed);
  }
  return "Ceritakan lebih lanjut.";
};
