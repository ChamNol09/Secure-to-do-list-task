const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLogin } = require('../middlewares/auth');
const validate = require('../middlewares/validate')
const { resgisterUserSchema,loginUserSchema, resendVerificationEmailSchema } = require('../validators/user')
const { apiLimiter, loginLimiter, registerLimiter} = require('../middlewares/rateLimit')


router.post('/register', registerLimiter,validate(resgisterUserSchema), authController.register);
router.post('/login',loginLimiter ,loginLimiter, validate(loginUserSchema), authController.login);
router.get('/verify-email', apiLimiter, authController.verificationEmail);
router.post('/resend-verification-email', apiLimiter, validate(resendVerificationEmailSchema), authController.resendVerificationEmail);
router.get('/profile',apiLimiter, isLogin, authController.getMe);

module.exports = router;