const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLogin } = require('../middlewares/auth');
const validate = require('../middlewares/validate')
const { resgisterUserSchema,loginUserSchema, resendVerificationEmailSchema } = require('../validators/user')

router.post('/register',validate(resgisterUserSchema), authController.register);
router.post('/login', validate(loginUserSchema), authController.login);
router.get('/verify-email', authController.verificationEmail);
router.post('/resend-verification-email', validate(resendVerificationEmailSchema), authController.resendVerificationEmail);
router.get('/profile', isLogin, authController.getMe);

module.exports = router;