const pool = require("../configs/db");

const getAllUsers = async ({ page = 1, limit = 10 }, is_active = "") => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const offset = (page - 1) * limit;
  let sql = `
    SELECT
      id,
      name,
      email,
      avatar,
      phone,
      address,
      role_id,
      is_verified,
      is_active,
      created_at,
      updated_at
    FROM users
  `;

  const params = [];

  if (is_active !== "") {
    sql += " WHERE is_active = ?";
    params.push(is_active);
  }

  sql += " LIMIT ? OFFSET ?";

  params.push(limit, offset);

  const [rows] = await pool.query(sql, params);

  return rows;
};

const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0];
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      avatar,
      phone,
      address,
      role_id,
      is_verified,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

const create = async (body) => {
  const [result] = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password,
      otp_code,
      otp_expire
    )
    VALUES
    (
      ?, ?, ?, ?, ?
    )
    `,
    [body.name, body.email, body.password, body.otp_code, body.otp_expire],
  );

  return result.insertId;
};

const updateUser = async (id, body) => {
  const [result] = await pool.query(
    `
    UPDATE users
    SET
      name = ?,
      email = ?,
      phone = ?,
      address = ?,
      is_active = ?
    WHERE id = ?
    `,
    [body.name, body.email, body.phone, body.address, body.is_active, id],
  );

  return result;
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

const addToken = async (token, id) => {
  await pool.query(
    `
    UPDATE users
    SET token = ?
    WHERE id = ?
    `,
    [token, id],
  );
};

const deleteToken = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET token = NULL
    WHERE id = ?
    `,
    [id],
  );
};

const getUserByToken = async (token) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE token = ?
    `,
    [token],
  );

  return rows[0];
};

const verifyEmail = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET
      is_verified = 1,
      email_verified_at = NOW(),
      otp_code = NULL,
      otp_expire = NULL
    WHERE id = ?
    `,
    [id],
  );
};

const findVerificationOtp = async (email, otp) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
      AND otp_code = ?
    `,
    [email, otp],
  );

  return rows[0];
};

const updateOtp = async (email, otp_code, otp_expire) => {
  await pool.query(
    `
    UPDATE users
    SET
      otp_code = ?,
      otp_expire = ?
    WHERE email = ?
    `,
    [otp_code, otp_expire, email],
  );
};

const updatePassword = async (email, password) => {
  await pool.query(
    `
    UPDATE users
    SET password = ?
    WHERE email = ?
    `,
    [password, email],
  );
};

const countAllUsers = async () => {
  const [rows] = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM users
    `,
  );

  return rows[0].total;
};

const updaloadAvatar = async (id, image) => {
  await pool.query("update users set avatar = ? where id = ?", [image, id]);
};
const removeAvatar = async (id) => {
  await pool.query("update users set avatar = null where id = ?", [id]);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  create,
  updateUser,
  deleteUser,
  addToken,
  deleteToken,
  getUserByToken,
  verifyEmail,
  findVerificationOtp,
  updateOtp,
  updatePassword,
  countAllUsers,
  updaloadAvatar,
  removeAvatar,
};
