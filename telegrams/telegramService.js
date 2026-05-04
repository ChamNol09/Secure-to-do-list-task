const pool = require("../configs/db");

const generateToken = async (userId) => {
  const token = Math.random().toString(36).substring(2);
  await pool.query(
    "UPDATE users SET telegram_token = ? WHERE id = ?",
    [token, userId]
  );
  return token;
};

const linkChatId = async (token, chatId) => {
  const [users] = await pool.query(
    "SELECT id FROM users WHERE telegram_token = ?",
    [token]
  );

  if (users.length === 0) {
    throw new Error("Invalid token");
  }

  const userId = users[0].id;

  await pool.query(
    "UPDATE users SET chat_id = ?, telegram_token = NULL WHERE id = ?",
    [chatId, userId]
  );

  return true;
};

module.exports = {
  generateToken,
  linkChatId,
};