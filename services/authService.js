const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwtConfig = require("../configs/jwt");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const mailService = require("./mailService");
const roleModel = require("../models/role");

const register = async (body) => {
  const checkEmail = await userModel.getUserByEmail(body.email);
  if (checkEmail) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  let result = await userModel.create({
    name: body.name,
    email: body.email,
    password: hashPassword,
    verificationToken,
    verificationExpires,
  });
  await mailService.sendVerificationEmail(body.email, verificationToken);
  let row = await userModel.getUserById(result);
  return row;
};

const getUserByEmail = async (email) => {
  let result = await userModel.getUserByEmail(email);
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const getUserById = async (id) => {
  let result = await userModel.getUserById(id);
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const login = async (body) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  }
  let UserInfo = await userModel.getUserByEmail(body.email);
  if (!UserInfo) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(body.password, UserInfo.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  if (!UserInfo.is_verified) {
    throw new Error("Please verify your email before logging in");
  }
  const role = await roleModel.getRoleById(UserInfo.role_id);


  const token = jwt.sign(
    { id: UserInfo.id, email: UserInfo.email, role: role.name },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expireIn },
  );
  await userModel.addToken(token, UserInfo.id);
  let row = await userModel.getUserById(UserInfo.id);
  return row;
};

const getMe = async (id) => {
    let row = await userModel.getUserById(id);
    return row;
};

const logout = async (id) => {
  await userModel.deleteToken(id);
};

const verificationEmail = async (token) => {
  if (!token) {
    throw new Error("Verification token is required");
  }
  let userInfo = await userModel.findVerificationEmail(token);
  if (!userInfo || userInfo.length === 0) {
    throw new Error("Invalid verification token");
  }
  if (userInfo[0].is_verified === 1) {
    throw new Error("Email already verified");
  }
  if (
    !userInfo[0].verification_expires ||
    new Date(userInfo[0].verification_expires) < new Date()
  ) {
    throw new Error("Verification token has expired");
  }
  await userModel.verifyEmail(userInfo[0].id);
  return userInfo;
};

const resendVerificationEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }
  let userInfo = await userModel.getUserByEmail(email);
  if (!userInfo.length === 0) {
    throw new Error("Invalid email");
  }
  if (userInfo.is_verified === 1) {
    throw new Error("Email already verified");
  }
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationExpires = new Date(Date.now() + 60 * 60 * 1000);
  await userModel.resendVerificationEmail({
    id: userInfo.id,
    verificationToken,
    verificationExpires,
  });
  await mailService.sendVerificationEmail(email, verificationToken);
  return {
    message: "Verification email resent successfully",
  };
};

module.exports = {
  register,
  getUserByEmail,
  getUserById,
  login,
  getMe,
  logout,
  verificationEmail,
  resendVerificationEmail,
};
