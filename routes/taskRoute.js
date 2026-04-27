const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { isLogin } = require('../middlewares/auth');
const { authoriz } = require('../middlewares/role');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema } = require('../validators/task');
const { apiLimiter } = require('../middlewares/rateLimit')

router.post('/create', apiLimiter, isLogin, authoriz("user"), validate(createTaskSchema), taskController.createTask);
router.get('/own-tasks', apiLimiter, isLogin, authoriz("user"), taskController.getOwnTasks);
router.put('/update/:id', apiLimiter, isLogin, authoriz("user"), validate(updateTaskSchema), taskController.updateTask);
router.delete('/delete/:id', apiLimiter, isLogin, authoriz("user"), taskController.deleteTask);

module.exports = router;