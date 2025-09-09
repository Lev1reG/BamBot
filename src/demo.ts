// try run with `npx ts-node src/demo.ts`

import { respond } from "./engine";

const samples = [
  "halo bambot",
  "apa manfaat bambu?",
  "cara menanam bambu gimana?",
  "gimana perawatan bambu",
  "ide produk bambu dong",
  "cara jualan produk bambu",
  "ada pelatihan bambu?",
  "piye carane ngerawat?",
  "makasih",
  "kamu bodoh!",
  "aku capek",
];

for (const s of samples) {
  console.log(`User: ${s}`);
  console.log(`Bot : ${respond(s)}`);
  console.log();
}
