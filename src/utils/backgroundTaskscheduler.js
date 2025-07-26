import { config } from "dotenv";
// import bot from "../bot-exp.js";
import TelegramBot from "node-telegram-bot-api";
config({ path: "../../.env" });
const token = process.env.TELEGRAM_BOT_TOKEN;


const bot = new TelegramBot(token, { polling: false });

process.on("message", ({ timeInSeconds, message, chatId }) => {
  console.log(chatId);
  console.log(
    `Received time: ${timeInSeconds} seconds and message: ${message}`
  );
  setTimeout(async () => {
    try {
      console.log(`Sending message after ${timeInSeconds} seconds: ${message}`);
      await bot.sendMessage(chatId, "Babu apko wo kaam karna tha");
      console.log("Message sent successfully");
    } catch (err) {
      console.log(`$this is error${err}`);
    }
    finally{
        process.exit();
    }
  }, timeInSeconds * 1000);
});
