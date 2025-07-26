import cron from "node-cron";


import TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = '8023515875:AAGvu3EpOSH28IShoETkECxhU-AAgIKvcUU';
const CHAT_ID = '5147495787'; // Replace with the number you got earlier

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

setInterval(() => {
  bot.sendMessage(CHAT_ID, '🔔 Pushkar lolu ding ding teri gand mardunga');
}, 2000);



console.log("Cron job scheduled to run daily at 2 AM");