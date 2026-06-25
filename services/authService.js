const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt");
const userModel = require("../models/user");
const roleModel = require("../models/role");
const mailService = require("./mailService");

const register = async (body) => {
  const exist = await userModel.getUserByEmail(body.email);

  if (exist) {
    throw new Error("Email already exists");
  }
  const password = await bcrypt.hash(body.password, 10);
  const otp_code = crypto.randomInt(100000, 1000000).toString();
  const otp_expire = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const id = await userModel.create({
    name: body.name,
    email: body.email,
    password,
    otp_code,
    otp_expire,
  });
  await mailService.sendVerificationOTP(body.email, otp_code);
  return await userModel.getUserById(id);
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
  const user = await userModel.getUserByEmail(body.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const matched = await bcrypt.compare(body.password, user.password);
  if (!matched) {
    throw new Error("Invalid email or password");
  }
  if (!user.is_verified) {
    throw new Error("Please verify your email.");
  }
  if (!user.is_active) {
    throw new Error("Your account has been disabled.");
  }
  const role = await roleModel.getRoleById(user.role_id);
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: role.name,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expireIn,
    },
  );
  await userModel.addToken(token, user.id);
  const profile = await userModel.getUserById(user.id);
  profile.token = token;
  return profile;
};

const getMe = async (id) => {
  let row = await userModel.getUserById(id);
  return row;
};

const logout = async (id) => {
  await userModel.deleteToken(id);
};

const verificationEmail = async (email, otp) => {
  const user = await userModel.findVerificationOtp(email, otp);
  if (!user) {
    throw new Error("Invalid OTP.");
  }
  if (user.is_verified) {
    throw new Error("Email already verified.");
  }
  if (!user.otp_expire || new Date(user.otp_expire).getTime() < Date.now()) {
    throw new Error("OTP has expired.");
  }
  await userModel.verifyEmail(user.id);
  return await userModel.getUserById(user.id);
};

const resendVerificationEmail = async(email)=>{
    const user = await userModel.getUserByEmail(email);
    if(!user){
        throw new Error("User not found.");
    }
    if(user.is_verified){
        throw new Error("Email already verified.");
    }
    const otp_code = crypto.randomInt(
        100000,
        1000000
    ).toString();
    const otp_expire = new Date(
        Date.now()+24*60*60*1000
    );
    await userModel.updateOtp(
        email,
        otp_code,
        otp_expire
    );
    await mailService.sendVerificationOTP(
        email,
        otp_code
    );
    return{

        message:"OTP sent successfully."
    }
}

const requestOtp = async (email) => {
  let checkEmail = await userModel.getUserOtp(email);
  if (!checkEmail) {
    throw new Error("Cannot find this user!");
  }
  const otp_code = crypto.randomInt(100000, 1000000);
  const otp_expire = new Date(Date.now() + 5 * 60 * 1000);
  await userModel.updateOtp(email, otp_code, otp_expire);
  await mailService.sendVerificationOTP(email, otp_code);
  return {
    message: "Request OTP successfully!",
  };
};

const verificationOtp = async (email, otp) => {
  let verified = await userModel.getUserOtp(email);
  if (!verified) {
    throw new Error("Cannot find this account!");
  }
  if (verified.otp_code !== String(otp) || verified.otp_expire < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }
  return verified;
};

const resetPassword = async (email, newPassword, comfirmPassword) => {
  let checkEmail = await userModel.getUserByEmail(email);
  if (!checkEmail) {
    throw new Error("Cannot find this account");
  }
  if (newPassword !== comfirmPassword) {
    throw new Error("Password don't matching");
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await userModel.updatePassword(email, hashPassword);
  return true;
};

module.exports = {
  register,
  getUserByEmail,
  getUserById,
  login,
  getMe,
  logout,
  verificationEmail,
  requestOtp,
  verificationOtp,
  resetPassword,
  resendVerificationEmail,
};
