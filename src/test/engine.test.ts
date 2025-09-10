import { describe, it, expect } from "vitest";
import { respond } from "../engine";

describe("Bambot regex", () => {
  // 1) GREET (tanpa @bambot harus tetap jalan)
  it("responds to greeting without activation token", () => {
    const r = respond("halo");
    expect(r).toMatch(/halo|bambot|bambu/i);
  });

  // 2) HELP intent
  it("guides user on HELP intent", () => {
    const r = respond("@bambot tolong bantu jelaskan");
    expect(r).toMatch(/bantuan|silakan pilih|manfaat bambu|cara menanam/i);
  });

  // 3) FAQ.MANFAAT
  it("answers bamboo benefits (FAQ.MANFAAT)", () => {
    const r = respond("@bambot apa manfaat bambu?");
    expect(r.toLowerCase()).toMatch(
      /manfaat bambu|ekonomi|jejak karbon|dekoratif/
    );
  });

  // 4) FAQ.PERAWATAN 
  it("answers bamboo care (FAQ.PERAWATAN)", () => {
    const r = respond("@bambot bagaimana cara merawat bambu supaya sehat?");
    // Cek ada kata kunci perawatan
    expect(r).toMatch(/siram|pupuk|pangkas|perawatan/i);
  });

  // 5) OUT_OF_SCOPE filter
  it("politely redirects out-of-scope topics", () => {
    const r = respond("@bambot harga motor beat berapa?");
    expect(r).toMatch(/di luar cakupan|fokusku.*bambu/i);
  });

  // 6) ABUSE/SAFETY de-escalation
  it("de-escalates abusive input", () => {
    const r = respond("@bambot kamu bodoh!");
    expect(r).toMatch(/aku di sini untuk membantu|jelaskan dengan lebih baik/i);
  });

  // 7) LOCALE.JAWA handling
  it("handles Javanese locale hints", () => {
    const r = respond("@bambot piye carane ngerawat?");
    expect(r).toMatch(/monggo|dipunperjelas/i);
  });

  // 8) FALLBACK with reflection (hindari kata Jawa seperti 'aku')
  it("falls back with reflection when unmatched", () => {
    const r = respond("@bambot saya merasa kamu tidak paham");
    expect(r.toLowerCase()).toMatch(/kamu/);
    expect(r).toMatch(/kamu bilang|dirinci|bantu/i);
  });
});
