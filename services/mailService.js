const transporter = require('../configs/mailer');
require('dotenv').config();

const sendVerificationEmail = async (to, token) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `My App <noreply@myapp.com>`, // Professional "From" header
    to,
    subject: 'Confirm your email address',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e1e1e1;
          border-radius: 10px;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          background-color: #4F46E5;
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          display: inline-block;
        }
        .footer {
          font-size: 12px;
          color: #888;
          text-align: center;
          margin-top: 30px;
        }
        .link-alt {
          word-break: break-all;
          font-size: 11px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Welcome to MyApp!</h2>
        </div>
        <p>Hi there,</p>
        <p>Thanks for signing up! Please confirm your email address to activate your account and get started.</p>
        
        <div class="button-container">
          <a href="${verificationLink}" class="button">Verify Email Address</a>
        </div>
        
        <p>This link will <strong>expire in 1 hour</strong>. If you did not create an account, no further action is required.</p>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} MyApp Inc. All rights reserved.</p>
          <p class="link-alt">If the button doesn't work, copy and paste this link into your browser:<br>
          ${verificationLink}</p>
        </div>
      </div>
    </body>
    </html>
    `
  });
};

const sendVerificationOTP = async (to, otp) => {
  await transporter.sendMail({
    from: `"My App" <noreply@myapp.com>`,
    to,
    subject: `${otp} is your verification code`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #333;">Verify Your Account</h2>
      </div>
      
      <p style="font-size: 16px; color: #555;">Hi there,</p>
      <p style="font-size: 16px; color: #555;">Use the following One-Time Password (OTP) to complete your verification. This code is valid for <b>10 minutes</b>.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #f3f4f6; border-radius: 8px; border: 1px dashed #4F46E5;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5;">${otp}</span>
        </div>
      </div>
      
      <p style="font-size: 14px; color: #888; text-align: center;">
        If you didn't request this code, you can safely ignore this email.
      </p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      
      <div style="font-size: 12px; color: #aaa; text-align: center;">
        <p>&copy; ${new Date().getFullYear()} MyApp Inc. All rights reserved.</p>
      </div>
    </div>
    `
  });
};

module.exports = { 
  sendVerificationEmail,
  sendVerificationOTP,
 };