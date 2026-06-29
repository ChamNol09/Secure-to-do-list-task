const userModel = require("../models/user");
const fs = require("fs");
const path = require("path");
const { getUserById } = require("./authService");

const updaloadAvatar = async (id, file) => {
  let checkUser = await userModel.getUserById(id);
  if (!checkUser || checkUser.length === 0) {
    throw new Error("Cannot find this user!");
  }
  if (!file) {
    throw new Error("No file uploaded");
  }
  const user = checkUser;

  if (user.avatar) {
    const oldImagePath = path.join(__dirname, "..", user.avatar);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      console.log("Old image deleted");
    }
  }
  const imagePath = `${process.env.BASE_URL}/upload/avatars/${file.filename}`;

  await userModel.updaloadAvatar(id, imagePath);
  let row = await userModel.getUserById(id);
  row.avatar = `${process.env.BASE_URL}${row.avatar}`;
  return row;
};

const removeAvatar = async (id) => {
  let checkUser = await userModel.getUserById(id);
  if (!checkUser) {
    throw new Error("Cannot find this user!");
  }
  let user = checkUser;
  await userModel.removeAvatar(id);

  if (user.avatar) {
    const oldImagePath = path.join(__dirname, "..", user.avatar);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      console.log("Old image deleted");
    }
  }
  let row = await userModel.getUserById(id);

  return row;
};

module.exports = {
  updaloadAvatar,
  removeAvatar,
};
