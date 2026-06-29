const userService = require("../services/user.service");

const uploadAvatar = async (req, res) => {
  try {
    const result = await userService.updaloadAvatar(req.params.id, req.file);

    return res.status(201).json({
      result: true,
      msg: "Update avatar successfully!",
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const removeAvatar = async (req, res) => {
  try {
    let result = await userService.removeAvatar(req.params.id);
    return res.status(201).json({
      result: true,
      msg: "Delete avatar successfully!",
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

module.exports = {
  uploadAvatar,
  removeAvatar,
};
