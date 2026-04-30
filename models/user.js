const pool = require("../configs/db");

const getAllUsers = async ({ page = 1, limit = 10 }, is_active) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT id, name, email, phone, address, is_verified, role_id, is_active, created_at, updated_at
    FROM users
  `;

  let params = [];

  if (is_active !== "") {
    query += " WHERE is_active = ?";
    params.push(is_active);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await pool.query(query, params);
  return rows;
};

const getUserByEmail = async (email) => {
  const [row] = await pool.query(
    "select id, name, email, password, phone, address, is_verified, role_id from users where email = ?",
    [email],
  );
  return row[0];
};

const getUserOtp = async (email) => {
  const [row] = await pool.query(
    "select id, name, email, password, phone, address, is_verified, role_id, otp_code, otp_expire from users where email = ?",
    [email],
  );
  return row[0];
};

const updateOtp = async (email, otp_code, otp_expire) =>{
      let arr = [
        otp_code,
        otp_expire,
        email
  ];
  let [row] = await pool.query(
    "update users set otp_code = ?, otp_expire = ? where email = ?",
    arr,
  );
  return row;
}

const getUserById = async (id) => {
  const [row] = await pool.query(
    "select id, name, email, phone, address, is_verified, role_id, token, created_at, updated_at from users where id = ?",
    [id],
  );
  return row[0];
};

const create = async (body) => {
  let arr = [
    body.name,
    body.email,
    body.password,
    body.verificationToken,
    body.verificationExpires,
  ];
  const [result] = await pool.query(
    "Insert into users (name, email, password, verification_token, verification_expires) values (?, ?, ?, ?, ?)",
    arr,
  );
  return result.insertId;
};

const updateUser = async (id, body) => {
  let arr = [
    body.name,
    body.email,
    body.phone,
    body.address,
    body.is_active,
    id,
  ];
  let [row] = await pool.query(
    "update users set name = ?, email = ?, phone = ?, address = ?,  is_active = ? where id = ?",
    arr,
  );
  return row;
};

const deleteUser = async (id) => {
  await pool.query("delete from users where id = ? ", [id]);
};

const addToken = async (token, id) => {
  const [result] = await pool.query("Update users set token = ? where id = ?", [
    token,
    id,
  ]);
  return result;
};

const getUserByToken = async (token) => {
  const [row] = await pool.query("Select * from users where token = ?", [
    token,
  ]);
  return row;
};

const deleteToken = async (id) => {
  const [result] = await pool.query(
    "Update users set token = null where id = ?",
    [id],
  );
  return result;
};

const findVerificationEmail = async (token) => {
  let [result] = await pool.query(
    "select id, name, email, phone, address, role_id, is_verified, verification_token, verification_expires from users where verification_token = ?",
    [token],
  );
  return result;
};

const verifyEmail = async (id) => {
  let [result] = await pool.query(
    "update users set is_verified = 1 where id = ?",
    [id],
  );
  return result;
};

const resendVerificationEmail = async (body) => {
  let arr = [body.verificationToken, body.verificationExpires, body.id];
  await pool.query(
    "update users set verification_token = ?, verification_expires = ? where id = ?",
    arr,
  );
};

const updatePassword = async(email, password) => {
    let arr = [
        password,
        email
    ]
    let [result] = await pool.query("update users set password = ? where email = ?", arr)
    return result[0];
}

const countAllUsers = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) as total FROM users");
  return rows[0].total;
};

module.exports = {
  getAllUsers,
  create,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByToken,
  addToken,
  deleteToken,
  findVerificationEmail,
  verifyEmail,
  resendVerificationEmail,
  getUserOtp,
  updateOtp,
  updatePassword,
  countAllUsers,
};
