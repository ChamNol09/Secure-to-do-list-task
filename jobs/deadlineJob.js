const cron = require("node-cron");
const pool = require("../configs/db");
const telegramService = require("../services/telegramService");

cron.schedule("* * * * *", async () => {
  try {
    // console.log("Checking deadlines...");
    const [tasks] = await pool.query(`
      SELECT t.*, u.chat_id
      FROM tasks t
      JOIN users u ON t.user_id = u.id
      WHERE t.deadline IS NOT NULL
        AND t.is_notified = 0
        AND TIMESTAMPDIFF(MINUTE, NOW(), t.deadline) BETWEEN 4 AND 5
    `);

    if (tasks.length === 0) return; 

    for (let task of tasks) {
      if (!task.chat_id) continue;

      await telegramService.sendMessage(
        task.chat_id,
        `⏰ Task Reminder: "${task.title}" is due in 5 minutes!`
      );

      await pool.query(
        "UPDATE tasks SET is_notified = 1 WHERE id = ?",
        [task.id]
      );
    }

  } catch (error) {
    console.error("Cron error:", error);
  }
});