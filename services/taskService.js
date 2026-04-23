const taskModel = require("../models/task");

const getOwnTasks = async (id) => {
  let rows = await taskModel.getOwnTasks(id);
  return rows;
};
const createTask = async (body, id) => {
  let result = await taskModel.createTask(body, id);
  if (!result) {
    throw new Error("Cannot create task");
  }
  let row = await taskModel.getTaskById(result);
  return row;
};

const updateTask = async (body, id, user_id) => {
    let checkTask = await taskModel.getTaskById(id);
    if (!checkTask) {
        throw new Error("Task not found");
    }
    if (checkTask.user_id !== user_id) {
        throw new Error("You are not authorized to update this task");
    }
  let result = await taskModel.updateTask(body, id, user_id);
  if (result.affectedRows === 0) {
    throw new Error("task not found or unauthorized");
  }
  let row = await taskModel.getTaskById(id);
  return row;
};

const deleteTask = async (id, user_id) => {
    let checkTask = await taskModel.getTaskById(id);
    if (!checkTask) {
        throw new Error("Task not found");
    }
    if (checkTask.user_id !== user_id) {
        throw new Error("You are not authorized to delete this task");
    }
    await taskModel.deleteTask(id, user_id);
}

module.exports = {
  getOwnTasks,
  createTask,
  updateTask,
  deleteTask,
};
