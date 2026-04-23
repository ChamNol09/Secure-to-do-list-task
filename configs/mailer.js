const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost",
  service: "gmail",
  auth: {
    user: "maochamnol37@gmail.com",
    pass: "tyvzzhwzognefctb",
  },
});

module.exports = transporter;
