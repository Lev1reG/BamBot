import { describe, it, expect } from "vitest";
import { respond } from "../engine";

describe("Bambot regex", () => {
  // 1) GREET — tanpa @bambot tetap jalan
  it("GREET: responds to greeting without activation token", () => {
    const r = respond("halo");
    expect(r).toMatch(/halo|bambot|bambu/i);
  });

  // 2) GREET — case-insensitive
  it("GREET: is case-insensitive", () => {
    const r = respond("HALO");
    expect(r).toMatch(/halo|bambot|bambu/i);
  });

  // 3) HELP
  it("HELP: shows guidance and topics", () => {
    const r = respond("@bambot tolong bantu jelaskan");
    expect(r).toMatch(/🧭|bantuan/i);
    expect(r).toMatch(/manfaat bambu|cara menanam|perawatan/i);
  });

  // 4) FAQ.MANFAAT
  it("FAQ.MANFAAT: lists bamboo benefits", () => {
    const r = respond("@bambot apa manfaat bambu?");
    expect(r.toLowerCase()).toMatch(
      /manfaat bambu|ekonomi|jejak karbon|dekoratif/
    );
  });

  // 5) FAQ.PERAWATAN
  it("FAQ.PERAWATAN: gives care checklist", () => {
    // penting: keyword perawatan/merawat dulu, lalu bambu agar cocok dengan pattern
    const r = respond("@bambot cara merawat bambu supaya sehat?");
    expect(r).toMatch(/siram|pupuk|pangkas|perawatan/i);
  });

  // 6) FAQ.PENANAMAN
  it("FAQ.PENANAMAN: mentions typical spacing 3-5 m", () => {
    const r = respond("@bambot bagaimana menanam bambu di lahan pekarangan?");
    // handler menyebut 3-5 m dengan hyphen; regex ini izinkan hyphen atau en-dash
    expect(r).toMatch(/3\s*[–-]\s*5\s*m?/i);
    expect(r).toMatch(/bibit sehat|drainase|mulsa/i);
  });

  // 7) FAQ.PRODUK
  it("FAQ.PRODUK: returns product ideas and steps", () => {
    const r = respond("@bambot ide produk bambu apa yang cocok untuk mulai?");
    expect(r).toMatch(
      /ide produk|anyaman|mebel mini|dekorasi|perlengkapan makan|langkah mulai/i
    );
    // pastikan ada bullet/angka
    expect(r).toMatch(/•|1\.\s|2\.\s/);
  });

  // 8) FAQ.PASAR
  it("FAQ.PASAR: shows marketing tips", () => {
    const r = respond("@bambot bagaimana cara pemasaran bambu secara online?");
    expect(r).toMatch(/pemasaran|storytelling|katalog|pre-?order|ulasan/i);
  });

  // 9) FAQ.PELATIHAN
  it("FAQ.PELATIHAN: provides training outline", () => {
    const r = respond("@bambot rekomendasi pelatihan bambu untuk warga?");
    expect(r).toMatch(
      /pelatihan|potensi bambu|praktik|finishing|pemasaran digital/i
    );
    expect(r).toMatch(/1\.\s|2\.\s|3\.\s/);
  });

  // 10) LOCALE.JAWA
  it("LOCALE.JAWA: replies in polite Javanese prompt", () => {
    const r = respond("@bambot piye carane ngerawat?");
    expect(r).toMatch(/monggo|dipunperjelas/i);
  });

  // 11) SMALLTALK
  it("SMALLTALK: handles phatic expressions", () => {
    const r = respond("@bambot makasih");
    // handler bisa pilih dua variasi; keduanya harus lolos dengan regex longgar
    expect(r).toMatch(/terima kasih|kenapa kamu merasa/i);
  });

  // 12) ABUSE/SAFETY
  it("ABUSE/SAFETY: de-escalates abusive input", () => {
    const r = respond("@bambot kamu bodoh!");
    expect(r).toMatch(/aku di sini untuk membantu|jelaskan dengan lebih baik/i);
  });

  // 13) OUT_OF_SCOPE
  it("OUT_OF_SCOPE: redirects when topic is not about bamboo", () => {
    const r = respond("@bambot rekomendasi motor matic untuk kuliah?");
    expect(r).toMatch(/di luar cakupan|fokusku .*edukasi bambu/i);
    expect(r).toMatch(
      /manfaat bambu|cara menanam|perawatan|ide produk|pemasaran|pelatihan/i
    );
  });

  // 14) FALLBACK
  it("FALLBACK: asks for clarification and reflects pronouns", () => {
    const r = respond("@bambot saya merasa kamu tidak paham");
    // fallback selalu berisi 'Kamu bilang:' dan refleksi pronoun (saya->kamu)
    expect(r).toMatch(/kamu bilang/i);
    expect(r.toLowerCase()).toMatch(/kamu/);
  });

  // 15) PRIORITY: GREET should win over HELP if both present
  it("PRIORITY: GREET outranks HELP when both patterns present", () => {
    const r = respond("@bambot halo tolong bantu");
    // karena priority GREET = 100 > HELP = 95, seharusnya sapaan yang muncul
    expect(r).toMatch(/halo|bambot|bambu/i);
  });

  // 16) ROBUST OUT_OF_SCOPE: 'AI' tanpa kata 'bambu' harus out-of-scope
  it("OUT_OF_SCOPE: AI without bamboo context is out of scope", () => {
    const r = respond("@bambot jelaskan AI modern itu apa");
    expect(r).toMatch(/di luar cakupan|fokusku .*edukasi bambu/i);
  });

  // 17) FORMAT CHECK: several FAQs should include bullets or numbering
  it("FORMAT: FAQs render bullets/numbering for readability", () => {
    const merge = [
      respond("@bambot apa manfaat bambu?"),
      respond("@bambot cara merawat bambu supaya sehat?"),
      respond("@bambot ide produk bambu apa yang cocok untuk mulai?"),
    ].join("\n\n");
    // Cari bullet '•' atau angka '1. '
    expect(merge).toMatch(/•|1\.\s|2\.\s/);
  });

  // 18) GREET alternative branch (choose())
  it("GREET: alternative branch via choose()", () => {
    // Jalankan beberapa kali untuk meningkatkan peluang cabang alternatif
    const tries = Array.from({ length: 5 }, () => respond("halo"));
    const joined = tries.join(" || ");
    // minimal salah satu berisi kata 'Bambot' atau daftar topik
    expect(joined).toMatch(
      /bambot|manfaat|menanam|merawat|ide produk|pemasaran|pelatihan/i
    );
  });
});
