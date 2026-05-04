const TelegramBot = require("node-telegram-bot-api");
const telegramService = require("./telegramService");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

// user starts bot with token
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const token = match[1];

  try {
    await telegramService.linkChatId(token, chatId);

    bot.sendMessage(chatId, "Telegram connected successfully!");
  } catch (error) {
    bot.sendMessage(chatId, "Invalid or expired link");
  }
});

// fallback message
bot.on("message", (msg) => {
  if (!msg.text.startsWith("/start")) {
    bot.sendMessage(msg.chat.id, "Send /start to connect your account.");
  }
});

module.exports = bot;