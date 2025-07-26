import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import * as chrono from "chrono-node";
// import { fork } from "child_process";
// import connection from "./redis_client.js";
import queue from "./bullMQ/queueInit.js";
import { DateTimeRecognizer } from "@microsoft/recognizers-text-date-time";

config({ path: "../.env" });
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const CHAT_ID = process.env.CHAT_ID; 
// const token = TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });
var recognizer = new DateTimeRecognizers.DateTimeRecognizers(Recognizers.Culture.English);
var model = recognizer.getNumberModel();
var result = model.parse('Twelve');
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received message from chat ${chatId}:`, msg.text);
  const da = chrono.parse(`${msg.text}`, new Date(), { forwardDate: true });
  if (da.length > 0) {
    const date = da[0].start.date();
    console.log("Parsed date:", date);
    // const child=fork("./utils/backgroundTaskScheduler.js");
    const delayInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
    if (delayInSeconds <= 0) {
      return bot.sendMessage(chatId, "Time must be in the future!");
    } else {
      try {
        await queue.add(
          "reminder",
          {
            chatId: chatId,
            message: msg.text,
            date: date.toISOString(),
          },
          {
            delay: delayInSeconds * 1000, // Convert seconds to milliseconds
            removeOnComplete: true,
            removeOnFail: true,
            jobId: `${chatId}-${date.toISOString()}`,
            attempts:3,
          }
        );
      } catch (err) {
        console.log(err);
      }

      bot.sendMessage(
        chatId,
        `Babu ma apko yaad dila dungi at sharp: ${date.toLocaleString()}`
      );
    }
  }
  // bot.sendMessage(chatId, 'Aapka message mujhe mil gaya hai! bhai 😊 \n\n main abhi apke baare mein jankari nikalta hun');
});

export default bot;
