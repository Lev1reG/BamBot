import { Client, LocalAuth, Message } from "whatsapp-web.js";
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

// ===== Handle incoming messages =====
client.on("message", async (message: Message) => {
  if (message.from === "status@broadcast") return;
  if (message.fromMe) return;

  const prefix = "@bambot";
  if (!message.body.toLowerCase().startsWith(prefix.toLowerCase())) {
    return;
  }

  const input = message.body.slice(prefix.length).trim();

  // TODO: Process the input and generate a response
});

client.initialize();
