const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router();
const { isLogin } = require('../middlewares/auth')
const upload  = require('../middlewares/upload.middleware');

router.put('/upload/:id', isLogin, upload.single("avatar") ,userController.uploadAvatar);
router.delete('/upload/:id', isLogin, userController.removeAvatar);

module.exports = router;
