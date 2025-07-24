import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";

config({ path: './.env' });


const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("Token:", token);

const port = process.env.PORT || 3000;
const webhookUrl = process.env.WEBHOOK_URL; 
console.log("Webhook URL:", webhookUrl);

const bot = new TelegramBot(token, { webHook: true });
const app = express();
app.use(express.json());

// For ES modules, resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cron.schedule('0 35 11 * * *', () => {
  console.log('Running daily task at 2 AM');
  // Add your daily task logic here
});

// Handle webhook requests
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
  console.log("CHildren things arre working");
});

// Bot logic
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received message from chat ${chatId}:`, msg.text);
  bot.sendMessage(chatId, 'Received your message boy, ');
  bot.sendAudio(chatId, path.join(__dirname, 'resources', 'bot-reply.mp3'));
});

app.listen(port, async () => {
  console.log(`Express server is listening on ${port}`);
  try {
    const info = await bot.setWebHook(`${webhookUrl}/bot${token}`);
    // console.log("Webhook set:", info);
  } catch (err) {
    console.error("Webhook setup failed:", err);
  }
});