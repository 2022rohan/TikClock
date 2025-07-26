import { Worker } from "bullmq";
import connection from "../redis_client.js";
// import queue from "./queueInit.js";
// import bot from "../bot-exp.js";
import TelegramBot from "node-telegram-bot-api";
import {config} from "dotenv";

config({ path: "../../.env" });

const bot=new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const worker=new Worker("mainQueue", async (job) => {
  console.log("Processing job:", job.id);
  const { chatId, message, date } = job.data;
  console.log(`Job data: chatId=${chatId}, message=${message}, date=${date}`);

  try {
   
    console.log(`Sending message to chat ${chatId}: ${message}`);

    const mssage = `Reminder: ${message} at ${new Date(date).toLocaleString()}`;

    await bot.sendMessage(chatId, mssage); 
    console.log("Message sent successfully");
  } catch (err) {
    console.error(`Error sending message: ${err}`);
  }
}, { connection });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});
worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});