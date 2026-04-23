const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt");
const userModel = require("../models/user");
const roleModel = require("../models/role");

const isLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        result: false,
        msg: "Unauthorized",
      });
    }

    let parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        result: false,
        msg: "Invalid token format",
      });
    }
    let token = parts[1];
    let decoded = jwt.verify(token, jwtConfig.secret);
    let user = await userModel.getUserById(decoded.id);
    let role = await roleModel.getRoleById(user.role_id);

    if (!user || user.length === 0) {
      throw new Error("Invalid or expired token");
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: role.name,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      result: false,
      msg: "Invalid or expired token",
    });
  }
};

module.exports = {
  isLogin,
};
