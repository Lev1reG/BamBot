import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import logger from "./logger";

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
  logger.info("QR code received, ready to scan.");
  qrcode.generate(qr, { small: true });
});

client.on("loading_screen", (percent: number, message: string) => {
  logger.debug("WhatsApp loading", { percent, message });
});

client.on("auth_failure", (msg: string) => {
  logger.error("Authentication failure", { error: msg });
});

client.on("authenticated", () => {
  logger.info("WhatsApp authenticated successfully!");
});

client.on("disconnected", (reason: string) => {
  logger.warn("Client was logged out", { reason });
});

client.on("ready", () => {
  logger.info("Whatsapp client is ready!");
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
