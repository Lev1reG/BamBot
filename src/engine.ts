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
        "*👋 Halo!* \n\nAda yang bisa saya bantu seputar *bambu* hari ini? Kita bisa bahas *manfaat, cara menanam/merawat, ide produk, pemasaran,* dan *pelatihan*.",
      ]),
  },
  {
    name: "HELP",
    priority: 95,
    pattern: /\b(bantu|tolong|help|bisa apa|cara pakai|panduan)\b/i,
    handler: () =>
      "*🧭 Bantuan*\n\n" +
      "Silakan pilih salah satu topik:\n" +
      "1. *Manfaat bambu*\n" +
      "2. *Cara menanam*\n" +
      "3. *Perawatan*\n" +
      "4. *Ide produk*\n" +
      "5. *Pemasaran*\n" +
      "6. *Pelatihan*\n\n" +
      "_Contoh:_ ketik: *manfaat* / *tanam* / *rawat* / *produk* / *pasar* / *pelatihan*",
  },
  {
    name: "FAQ.MANFAAT",
    priority: 90,
    pattern:
      /\b(manfaat|kegunaan|keunggulan)\b.*\bbambu\b|\bbambu\b.*\b(manfaat|kegunaan|keunggulan)\b/i,
    handler: () =>
      choose([
        choose([
          "Berikut gambaran manfaat bambu yang relevan untuk desa:\n\n" +
            "• *Ekonomi*: bahan produk bernilai tambah (mebel, anyaman, dekorasi)\n" +
            "• *Lingkungan*: serapan CO₂ baik; akar bantu konservasi tanah & air\n" +
            "• *Material*: kuat, lentur, relatif ramah lingkungan\n" +
            "• *Sosial/Budaya*: angkat kearifan lokal & identitas desa\n\n",
          "*🌿 Manfaat Bambu*\n\n" +
            "• Bahan baku *UMKM* yang mudah diolah\n" +
            "• *Pertumbuhan cepat* → lebih cepat panen\n" +
            "• *Jejak karbon rendah*\n" +
            "• Cocok untuk produk *fungsional* & *dekoratif*",
        ]),
      ]),
  },
  {
    name: "FAQ.PERAWATAN",
    priority: 90,
    pattern:
      /\b(rawat|perawatan|hama|penyakit|pemupukan|penyiraman|pangkas|pruning)\b.*\bbambu\b/i,
    handler: () =>
      "*🧰 Perawatan Bambu*\n\n" +
      "1. *Siram* rutin, hindari becek\n" +
      "2. *Pupuk* NPK ringan tiap *2-3 bulan* + kompos/mulsa\n" +
      "3. *Pangkas* rebung/ruas lemah agar sirkulasi bagus\n" +
      "4. *Hama/Penyakit*: mulai mekanis → lanjut *bio-pestisida* bila perlu\n" +
      "5. *Kebersihan rumpun*: singkirkan serasah berlebih\n\n",
  },
  {
    name: "FAQ.PENANAMAN",
    priority: 90,
    pattern:
      /\b(tanam|menanam|bibit|stek|rimpang|jarak tanam|media tanam|lahan)\b.*\bbambu\b/i,
    handler: () =>
      "*🌱 Penanaman Bambu*\n\n" +
      "1. Pakai *bibit sehat* (stek/rimpang)\n" +
      "2. *Jarak tanam* umumnya *3-5 m* (tergantung varietas & kepadatan)\n" +
      "3. Tanah *gembur* + *drainase* baik; tambah *kompos* & *mulsa*\n" +
      "4. 2-4 minggu awal: jaga *kelembapan* & pantau *daun*\n\n",
  },
  {
    name: "FAQ.PRODUK",
    priority: 85,
    pattern:
      /\b(produk|kerajinan|mebel|anyam(an)?|panel|dekorasi|ukm|ide)\b.*\bbambu\b/i,
    handler: () =>
      "*💡 Ide Produk Bambu*\n\n" +
      "• *Anyaman*: keranjang, tatakan, tudung saji\n" +
      "• *Mebel mini*: stool, rak dinding/tanaman (*fokus sambungan & finishing*)\n" +
      "• *Dekorasi*: lampu meja/dinding, bingkai foto, pot cover\n" +
      "• *Perlengkapan makan*: sendok kayu+bambu, sedotan (*finishing food-safe*)\n\n" +
      "*Langkah mulai:*\n" +
      "1. Riset selera lokal\n" +
      "2. Buat 1-2 prototipe & foto rapi\n" +
      "3. Uji harga di pasar/online\n" +
      "4. Kumpulkan feedback → produksi kecil bertahap",
  },
  {
    name: "FAQ.PASAR",
    priority: 85,
    pattern:
      /\b(pasar|jual|harga|pemasaran|permintaan|market|jualan|menjual)\b.*\bbambu\b/i,
    handler: () =>
      "*🛒 Pemasaran Produk Bambu*\n\n" +
      "1. *Storytelling*: bahan lokal & dampak sosial\n" +
      "2. *Foto/katalog*: latar bersih, ukuran, harga, paket bundling\n" +
      "3. *Kanal*: titip toko oleh-oleh; promosi WA/FB/IG/TikTok; coba *pre-order*\n" +
      "4. *Harga*: catat bahan & waktu kerja; uji beberapa harga\n" +
      "5. *Repeat order*: minta *ulasan* + berikan *kode diskon*",
  },
  {
    name: "FAQ.PELATIHAN",
    priority: 85,
    pattern: /\b(pelatihan|kelas|workshop|pendampingan|diklat)\b.*\bbambu\b/i,
    handler: () =>
      "*👩‍🏫 Rekomendasi Pelatihan Singkat*\n\n" +
      "1. *Potensi bambu* & peluang ekonomi\n" +
      "2. *Budidaya, panen, pengeringan* (dasar)\n" +
      "3. *Praktik* 1 produk (anyaman/mebel mini) + *safety alat*\n" +
      "4. *Finishing/anti-rayap* & *QC*\n" +
      "5. *Pemasaran digital*: foto, caption, harga, pre-order\n\n" +
      "_Siapkan modul ringkas & daftar alat agar mudah direplikasi._",
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
        "*💬*\n\n" +
          `Kenapa kamu merasa *${reflect(m[0])}*? ` +
          "Boleh ceritakan sedikit.",
        "*💬*\n\n" +
          "Terima kasih! Ada topik bambu tertentu yang ingin dibahas?",
      ]),
  },
  {
    name: "ABUSE/SAFETY",
    priority: 40,
    pattern:
      /\b(bodoh|goblok|anjir|anjing|k\**g|t*l*l|bacot|bangsat|kampret)\b/i,
    handler: () =>
      "*🤝*\n\n" +
      "Aku di sini untuk membantu. Jika ada yang kurang pas, beri tahu bagian mana yang ingin kamu perjelas—aku akan jelaskan dengan lebih baik dan pelan-pelan.",
  },
  {
    name: "OUT_OF_SCOPE",
    priority: 30,
    pattern:
      /\b(sepak\s*bola|game|crypto|kripto|motor|film|musik|kuliah|matkul|AI(?!.*bambu))\b/i,
    handler: () =>
      "*ℹ️ Di luar cakupan*\n\n" +
      "Fokusku *edukasi bambu*. Coba pilih topik berikut:\n" +
      "• *Manfaat bambu*\n" +
      "• *Cara menanam*\n" +
      "• *Perawatan*\n" +
      "• *Ide produk*\n" +
      "• *Pemasaran*\n" +
      "• *Pelatihan*",
  },
  {
    name: "FALLBACK",
    priority: 0,
    pattern: /([\s\S]+)/,
    handler: (_m, original) =>
      "*❓*\n\n" +
      `Kamu bilang: “*${reflect(original)}*”. \n` +
      "Boleh ceritakan lebih rinci bagian mana yang ingin kamu bahas—supaya aku bisa menyamakan konteks dan bantu lebih tepat?",
  }
);

// --- Reflection (Indonesia + Jawa ELIZA-style) ---
const reflectionPairs: [RegExp, string][] = [
  // Indonesia (formal & sehari-hari)
  [/\bsaya\b/gi, "kamu"],
  [/\baku\b/gi, "kamu"],
  [/\bpunyaku\b/gi, "punyamu"],
  [/\bpunyamu\b/gi, "punyaku"],
  [/\bmilikku\b/gi, "milikmu"],
  [/\bmilikmu\b/gi, "milikku"],
  [/\bdiriku\b/gi, "dirimu"],
  [/\bdirimu\b/gi, "diriku"],
  [/\bkami\b/gi, "kamu"],
  [/\bkam(u|i)\b/gi, "saya"],

  // Jawa (umum dipakai di Sapuran, Wonosobo)
  [/\bakú\b/gi, "kowe"], // aku → kowe
  [/\bkowe\b/gi, "aku"], // kowe → aku
  [/\bawakmu\b/gi, "awakku"], // awakmu → awakku
  [/\bawakku\b/gi, "awakmu"],
  [/\bdirimu\b/gi, "diriku"],
  [/\bdiriku\b/gi, "dirimu"],
  [/\baku iki\b/gi, "kowe kuwi"], // variasi idiomatis
  [/\bkok\b/gi, "ngapa"], // refleksi ringan (opsional)
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
  "*👋 Halo!* \n\nSaya *Bambot*. Saya bisa bantu seputar *bambu*: manfaat, penanaman, perawatan, ide produk, pemasaran, dan pelatihan. \n\nTanyakan topik yang kamu butuhkan ya 🙂";
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
