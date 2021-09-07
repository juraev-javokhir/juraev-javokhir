require ('dotenv').config();
const { Telegraf } = require('telegraf')
const api = require ('covid19-api');
const bot = new Telegraf(process.env.BOT_TOKEN);
const COUNTRIES_LIST = require ('./constants');

bot.start((ctx) => ctx.reply(`Assalomu Alaykum ${ctx.message.from.first_name}
 Ushbu 'Telegram-BOT' yordamida siz ayni damda qaysi davlatda necha kishi COVID-19 virusini yuqtirganligini yoki kasallikdan tuzalganligini bilib olishingiz mumkin. 
 Istalgan davlat nomini kiriting va bilib oling ! 
Misol: uzbekistan - (davlat nomi 'INGLIZ' tilida yozilishi kerak !)`));

bot.help((ctx) => ctx.reply (COUNTRIES_LIST));

bot.on('text', async(ctx) => {
let data = {}

try {
data =  await api.getReportsByCountries(ctx.message.text);

const formatData =  `
Davlat: ${data[0][0].country}
Covid-19 Yuqtirganlar: ${data[0][0].cases}
O'lim xolatlari: ${data[0][0].deaths}
Tuzalganlar:${data[0][0].recovered} `;

ctx.reply(formatData)
}  catch {ctx.reply(
    `XATO ! Bunday Davlat Mavjud Emas !`
    )
};
    

});

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()



