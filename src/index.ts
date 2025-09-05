import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  },
});

client.on("qr", (qr: string) => {
  console.log("QR Received");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Whatsapp client is ready!");
});

client.initialize();
