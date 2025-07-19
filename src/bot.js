import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

config({ path: './.env' });

const token = process.env.TELEGRAM_BOT_TOKEN;
const port = process.env.PORT || 3000;
const webhookUrl = process.env.WEBHOOK_URL; // e.g., https://yourdomain.com/bot<token>

const bot = new TelegramBot(token);
const app = express();
app.use(express.json());

// For ES modules, resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set webhook
bot.setWebHook(`${webhookUrl}/bot${token}`);

// Handle webhook requests
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
  console.log(req);
});

// Bot logic
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
  bot.sendAudio(chatId, path.join(__dirname, 'resources', 'bot-reply.mp3'));
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});