const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isLogin } = require("../middlewares/auth");
const { authoriz } = require("../middlewares/role");
const { apiLimiter } = require("../middlewares/rateLimit");

router.get(
  "/users",
  apiLimiter,
  isLogin,
  authoriz("Admin"),
  adminController.getAllUsers,
);
router.delete(
  "/user/:id",
  apiLimiter,
  isLogin,
  authoriz("Admin"),
  adminController.deleteUser,
);
router.get(
  "/tasks",
  apiLimiter,
  isLogin,
  authoriz("Admin"),
  adminController.getAllTasks,
);
router.delete(
  "/task/:id",
  apiLimiter,
  isLogin,
  authoriz("Admin"),
  adminController.deleteTask,
);

module.exports = router;
