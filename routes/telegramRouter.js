const express = require("express");
const router = express.Router();

const telegramController = require("../telegrams/telegramController");
const { isLogin } = require("../middlewares/auth");

router.post("/connect", isLogin, telegramController.createTelegramLink);

module.exports = router;