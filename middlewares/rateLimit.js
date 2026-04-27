const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    result: false,
    msg: "Too many login attempts, try again later",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    result: false,
    msg: "Too many login attempts, try again later",
  },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    result: false,
    msg: "Too many register attempts, try again later",
  },
});

module.exports = {
    apiLimiter,
    loginLimiter,
    registerLimiter
}
