const pool = require("../configs/db");

const createTask = async (body, user_id) => {
  let arr = [body.title, body.description, body.status, user_id];
  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
    arr,
  );
  return result.insertId;
};

const getTaskById = async (id) => {
  const [row] = await pool.query(
    "SELECT id, title, description, status, user_id, created_at, updated_at FROM tasks WHERE id = ?",
    [id],
  );
  return row[0];
};

const getOwnTasks = async ({ id, page, limit, status }) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT id, title, description, status, user_id, created_at, updated_at
    FROM tasks
    WHERE user_id = ?
  `;

  let params = [id];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

  const [rows] = await pool.query(query, params);
  return rows;
};

const countTasks = async (user_id, status) => {
  let sql = "SELECT COUNT(*) as total FROM tasks WHERE user_id = ?";
  let params = [user_id];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  const [rows] = await pool.query(sql, params);
  return rows[0].total;
};

const countAllTasks = async (status) => {
  let sql = "SELECT COUNT(*) as total FROM tasks";
  let params = [];

  if (status) {
    sql += " WHERE status = ?";
    params.push(status);
  }

  const [rows] = await pool.query(sql, params);
  return rows[0].total;
};

const getAllTasks = async ({ page , limit , status }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const offset = (page - 1) * limit;
  let query = `
    SELECT id, title, description, status, user_id, created_at, updated_at
    FROM tasks
  `;
  let params = [];
  if (status) {
    query += " WHERE status = ?";
    params.push(status);
  }
  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);
  const [rows] = await pool.query(query, params);
  return rows;
};

const updateTask = async (body, id, user_id) => {
  let arr = [body.title, body.description, body.status, id, user_id];
  let [result] = await pool.query(
    "Update tasks set title = ?, description = ?, status = ? where id = ? and user_id = ?",
    arr,
  );
  return result;
};

const deleteTask = async (id) => {
  await pool.query("delete from tasks where id = ?", [id]);
};

module.exports = {
  createTask,
  getTaskById,
  getOwnTasks,
  getAllTasks,
  countTasks,
  countAllTasks,
  updateTask,
  deleteTask,
};
