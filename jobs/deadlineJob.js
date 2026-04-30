const cron = require("node-cron");
const pool = require("../configs/db");
const telegramService = require("../services/telegramService");

cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking deadlines...");

    const [tasks] = await pool.query(`
      SELECT * FROM tasks
      WHERE deadline IS NOT NULL
        AND is_notified = 0
        AND TIMESTAMPDIFF(MINUTE, NOW(), deadline) = 5;
    `);
    console.log(tasks[0].id);
    
    await pool.query("UPDATE tasks SET is_notified = 1 WHERE id = ?", [
      tasks[0].id,
    ]);
    for (let task of tasks) {
      await telegramService.sendMessage(
        process.env.CHAT_ID,
        `⏰ Task Reminder: "${task.title}" is due in 5 minutes, please finish your task!`,
      );
    }
  } catch (error) {
    console.error("Cron error:", error);
  }
});
