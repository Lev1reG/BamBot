import { describe, it, expect } from "vitest";
import { respond } from "../engine";

describe("Bambot regex", () => {
  // 1) GREET (tanpa @bambot harus tetap jalan)
  it("responds to greeting without activation token", () => {
    const r = respond("halo");
    expect(r).toMatch(/Halo|Bambot|bisa saya bantu/i);
  });

  // 2) HELP intent
  it("guides user on HELP intent", () => {
    const r = respond("@bambot tolong bantu jelaskan");
    expect(r).toMatch(/Boleh dipersempit|Bambot|Tanyakan saja/i);
  });

  // 3) FAQ.MANFAAT
  it("answers bamboo benefits (FAQ.MANFAAT)", () => {
    const r = respond("@bambot apa manfaat bambu?");
    expect(r.toLowerCase()).toMatch(/bambu/);
  });

  // 4) FAQ.PENANAMAN (jarak tanam)
  it("answers planting distance (FAQ.PENANAMAN)", () => {
    const r = respond("@bambot jarak tanam bambu berapa ya?");
    // biasanya 3–5 m (pakai variasi dash)
    expect(r).toMatch(/3(?:\s*[–-]\s*|–|-)5\s*m?/i);
  });

  // 5) OUT_OF_SCOPE filter
  it("politely redirects out-of-scope topics", () => {
    const r = respond("@bambot harga motor beat berapa?");
    expect(r).toMatch(/Fokusku|bambu/i);
  });

  // 6) ABUSE/SAFETY de-escalation
  it("de-escalates abusive input", () => {
    const r = respond("@bambot kamu bodoh!");
    expect(r).toMatch(/Aku di sini untuk membantu|bantu/i);
  });

  // 7) LOCALE.JAWA handling
  it("handles Javanese locale hints", () => {
    const r = respond("@bambot piye carane ngerawat?");
    expect(r).toMatch(/Monggo|dipunperjelas/i);
  });

  // 8) FALLBACK with reflection
  it("falls back with reflection when unmatched", () => {
    const r = respond("@bambot aku merasa kamu tidak paham");
    // Harus ada efek refleksi "aku" -> "kamu" di balasan
    expect(r.toLowerCase()).toMatch(/kamu/);
    // dan pola fallback khas
    expect(r).toMatch(/Kamu bilang|dirinci|bantu/i);
  });
});
