const userModel = require("../models/user");
const taskModel = require("../models/task");

const getAllUsers = async ({ page, limit, status }) => {
  let is_active = {status}.status;
  let rows = await userModel.getAllUsers({ page, limit}, is_active);
  let total = await userModel.countAllUsers();
  if (!rows) {
    throw new Error("Cannot get users");
  }
  return {
    rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const deleteUser = async (id) => {
  let checkUser = await userModel.getUserById(id);
  if(checkUser.role_id == 1){
    throw new Error("Cannot delete admin account");
  }
  let user = await userModel.getUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  await userModel.deleteUser(id);
};

const getAllTasks = async ({ page, limit, status }) => {
  let checkStatus = {status}.status
  let rows = await taskModel.getAllTasks({ page, limit }, checkStatus);
  let total = await taskModel.countAllTasks(checkStatus);
  if (!rows) {
    throw new Error("Cannot get tasks");
  }
  return {
    rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const deleteTask = async (id) => {
  let task = await taskModel.getTaskById(id);
  if (!task) {
    throw new Error("Task not found");
  }
  await taskModel.deleteTask(id);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllTasks,
  deleteTask,
};
