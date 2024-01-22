const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./option')

const token = "6702534434:AAFK9cjbpAfA68AfJ3rJy0yiK64ftx6pFc8"

const bot = new TelegramApi(token,{polling:true})

const chats = {

}




const startGame = async (chatId) => {
  await bot.sendMessage(chatId,'SEYCHAS YA ZAGADAYU CIFRU OT 0 DO 9 , A TI DOLJEN EYO OTGADAT')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'OTGADAY',gameOptions)
}

const start = () => {
  
  bot.setMyCommands([
    {command:'/start', description:'PRIVETSTVIE'},
    {command:'/info', description:'FIRST NAME, LAST NAME'},
    {command:'/game', description:'IGRA UGADAY CIFRU'},
  ])
  
  bot.on("message", async msg => {
      const text = msg.text 
      const chatId = msg.chat.id
     
      if(text === '/start') {
        await  bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/1.jpg')
        return  bot.sendMessage(chatId,`Dobro pojalovat v gameBot`)
      }
      if(text === '/info') {
       return  bot.sendMessage(chatId,`Tebya zovut ${msg.from.first_name}
         ${msg.from.last_name}
         `)
      }
      if(text === '/game'){
        return startGame(chatId)
      }

     return bot.sendMessage(chatId,'Moya tvoya ne ponimat, poprobuy eshyo razok!))')
  })
  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
       return startGame(chatId)
    }
if (data === chats[chatId]) {
  return bot.sendMessage(chatId,`POZDRAVLYAEM! VI UGADALI CIFRU ${chats[chatId]}`,againOptions)

} else {
  return bot.sendMessage(chatId, ` K SOJALENIYU VI NE UGADALI, PRAVILNIY OTVET ${chats[chatId]}`,againOptions)
}
    
   
  })
}
start()