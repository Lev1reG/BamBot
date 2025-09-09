import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import logger from "./logger";
import { respond } from "./engine";

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
  try {
    logger.info("Message received", {
      from: message.from,
      messageType: message.type,
      isGroupMsg: message.from.includes("@g.us"),
      messageLength: message.body?.length || 0,
    });

    // Filter out unwanted messages
    if (message.from === "status@broadcast") {
      logger.debug("Ignoring status broadcast message");
      return;
    }

    if (message.fromMe) {
      logger.debug("Ignoring message sent by the bot itself");
      return;
    }

    const prefix = "@bambot";
    if (!message.body.toLowerCase().startsWith(prefix)) {
      logger.debug("Message doesn't have bot prefix", {
        from: message.from,
        startsWithPrefix: false,
      });
      return;
    }

    const input = message.body.slice(prefix.length).trim();

    logger.info("Processing message", {
      from: message.from,
      input: input,
      inputLength: input.length,
      isGroup: message.from.includes("@g.us"),
    });

    // Generate response
    const response = respond(input);

    // Send the response
    await message.reply(response);

    logger.info("Response sent successfully", {
      to: message.from,
      responseLength: response.length,
      input: input,
    });
  } catch (error) {
    logger.error("Error processing message", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      from: message.from,
      messageBody: message.body?.substring(0, 50) + "...",
    });

    try {
      await message.reply(
        "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan cobal lagi"
      );
    } catch (replyError) {
      logger.error("Failed to send error message", {
        error:
          replyError instanceof Error ? replyError.message : String(replyError),
        to: message.from,
      });
    }
  }
});

logger.info("Starting BamBot...");
client.initialize();
