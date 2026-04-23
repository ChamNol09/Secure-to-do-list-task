const authService = require("../services/authService");

const getUserById = async (req, res) => {
  try {
    let result = await authService.getUserById(req.params.id);
    return res.status(200).json({
      result: true,
      msg: "Get user successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      result: true,
      msg: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    let result = await authService.register(req.validateData);
    return res.status(201).json({
      result: true,
      msg: "Register successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      result: true,
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let result = await authService.login(req.body);
    return res.status(200).json({
      result: true,
      msg: "Login successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const verificationEmail = async (req, res) => {
  console.log(req.query.token);
  try {
    let result = await authService.verificationEmail(req.query.token);
    return res.status(200).json({
      result: true,
      msg: "Email verified successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    let result = await authService.resendVerificationEmail(req.body.email);
    return res.status(200).json({
      result: true,
      msg: result.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    console.log(req.user.id);
    let result = await authService.getMe(req.user.id);
    return res.status(200).json({
      result: true,
      msg: "Get profile successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

module.exports = {
  getUserById,
  register,
  verificationEmail,
  login,
  resendVerificationEmail,
  getMe,
};
