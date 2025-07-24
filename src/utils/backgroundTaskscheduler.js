import { config } from "dotenv";
import bot from "../bot-exp.js";


// const chatId=process.env.CHAT_ID;
// bot.on('polling_error', (error) => {
// bot.stopPolling();
// console.log('bot pollling error: ' + error); // Print the error to the console
// });


process.on('message',({timeInSeconds,message,chatId})=>{
   console.log(chatId);
    console.log(`Received time: ${timeInSeconds} seconds and message: ${message}`);
    setTimeout(() => {
        console.log(`Sending message after ${timeInSeconds} seconds: ${message}`);
        bot.sendMessage(chatId, "Babu apko wo kaam karna tha");
       
        process.exit();
    }, timeInSeconds * 1000);
})
