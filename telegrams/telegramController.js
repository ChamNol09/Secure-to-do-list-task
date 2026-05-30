const telegramService = require("./telegramService");

const createTelegramLink = async (req, res) => {
  try {
    const token = await telegramService.generateToken(req.user.id);

    const link = `https://t.me/${process.env.BOT_USERNAME}?start=${token}`;

    return res.json({
      result: true,
      msg: "Create Link successfully!",
      link,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

module.exports = {
  createTelegramLink,
};