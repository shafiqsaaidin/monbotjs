const TelegramBot = require('node-telegram-bot-api');
const token = require('./member');
const bot = new TelegramBot(token.botApi, {polling: true});
const screenshot = require('desktop-screenshot');

// Import member array from member.js
var users = require('./member');

bot.onText(/\/start/, function(msg, match){
  const chatId = msg.chat.id;

  console.log("Got Command from " + chatId);

  // Greet user and send button option
  bot.sendMessage(chatId, "Welcome", {
    "reply_markup": {
      "keyboard": [["capture"],["autoCapture"]]
    }
  });
});

// Keyboard Command
bot.on('message', function(msg){
  const chatId = msg.chat.id;

  console.log("Got message from " + chatId);

  var manualCapture = "capture";
  var autoCapture = "autoCapture";
  // var stopAll = "stopAll"
  var auto;

  // Check if the user in admin list
  if(token.users.indexOf(chatId) == -1){
    bot.sendMessage(chatId, "Your're not in admin list");
  } else{
    if(msg.text.indexOf(manualCapture) === 0){
      snap();

      // delay 2s before send pic to user
      setTimeout(function() {
        bot.sendPhoto(chatId, __dirname + "/images/snap1.png");
      }, 2000);
    } else if(msg.text.indexOf(autoCapture) === 0){
      bot.sendMessage(chatId, "Screenshot will be send every 5 minutes")

      // send pic to telegrambot every 300000 = 5minute
      auto = setInterval(function(){
        snap();

        // delay 2s before send pic to user
        setTimeout(() => {
          bot.sendPhoto(chatId, __dirname + "/images/snap1.png");
        }, 2000);
      }, 300000);
    }
  }
});

// Function list
function snap(){
  screenshot(__dirname + "/images/snap1.png", function(err, complete){
    if(err){
      console.log("Screenshot failed", err);
    } else{
      console.log("Screenshot succeeded");
    }
  });
}
