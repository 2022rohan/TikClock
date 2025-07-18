import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config({path:'./.env'});

const token=process.env.TELEGRAM_BOT_TOKEN;
const bot=new TelegramBot(token, {polling: true});
// console.log("Token:", token);
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
