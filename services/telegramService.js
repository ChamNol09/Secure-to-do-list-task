const axios = require("axios");

const sendMessage = async (chatId, message) => {
  const token = process.env.BOT_TOKEN;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await axios.post(url, {
    chat_id: chatId,
    text: message,
  });
};

module.exports = { sendMessage };