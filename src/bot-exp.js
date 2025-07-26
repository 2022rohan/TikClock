import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import * as chrono from 'chrono-node';
import { fork } from "child_process";
import connection from "./redis_client.js";

config({ path: '../.env' });
const TOKEN=process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID=process.env.CHAT_ID; // Replace with the number you got earlier
// const token = TOKEN;
console.log("Token:", TOKEN);

const bot=new TelegramBot(TOKEN, { polling: true });


bot.on('message',(msg)=>{
    const chatId=msg.chat.id;
    console.log(`Received message from chat ${chatId}:`, msg.text);
    const da=chrono.parse(`${msg.text}`, new Date(), { forwardDate: true });
    if(da.length > 0) {
        const date = da[0].start.date();
        console.log("Parsed date:", date);
        const child=fork("./utils/backgroundTaskScheduler.js");
        const delayInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
        try{
           child.send({timeInSeconds: delayInSeconds, message: msg.text,chatId:chatId});
        }
        catch(err){
            console.log(err);
        }
        
        bot.sendMessage(chatId, `Babu ma apko yaad dila dungi at sharp: ${date.toLocaleString()}`);
    }
    // bot.sendMessage(chatId, 'Aapka message mujhe mil gaya hai! bhai 😊 \n\n main abhi apke baare mein jankari nikalta hun');
   
});

export default bot;