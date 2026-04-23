const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isLogin } = require("../middlewares/auth");
const { authoriz } = require("../middlewares/role");

router.get("/users", isLogin, authoriz("admin"), adminController.getAllUsers);
router.delete('/user/:id', isLogin, authoriz("admin"),adminController.deleteUser);
router.get('/tasks', isLogin, authoriz("admin"), adminController.getAllTasks);
router.delete('/task/:id', isLogin, authoriz("admin"), adminController.deleteTask);

module.exports = router;
