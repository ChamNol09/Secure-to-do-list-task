const adminService = require("../services/adminService");

const getAllUsers = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.per_page;
    let { status } = req.query.status;
    const result = await adminService.getAllUsers({
      page,
      limit,
      status,
    });
    return res.status(200).json({
      result: true,
      msg: "Get all users successfully",
      data: result.rows,
      pagination : result.pagination
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    return res.status(200).json({
      result: true,
      msg: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const page = req.query.page;
    let limit = req.query.per_page;
    let { status } = req.query.status;
    let result = await adminService.getAllTasks({
      page,
      limit,
      status,
    });
    return res.status(200).json({
      result: true,
      msg: "Get all tasks successfully",
      data: result.rows,
      paigination: result.pagination
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await adminService.deleteTask(req.params.id);
    return res.status(200).json({
      result: true,
      msg: "Task deleted successfully",
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
  getAllUsers,
  deleteUser,
  getAllTasks,
  deleteTask,
};
