const { create } = require("../models/user");
const taskService = require("../services/taskService");

const getOwnTasks = async (req, res) => {
  try {
    let rows = await taskService.getOwnTasks(req.user.id);
    return res.status(200).json({
      result: true,
      msg: "Get own tasks successfully",
      data: rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: "Cannot get own tasks",
    });
  }
};

const createTask = async (req, res) => {
  try {
    let row = await taskService.createTask(req.body, req.user.id);
    return res.status(201).json({
      result: true,
      msg: "Create task successfully",
      data: row,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: "Cannot create task",
    });
  }
};

const updateTask = async (req, res) => {
    try {
        let row = await taskService.updateTask(req.body, req.params.id, req.user.id);
        return res.status(200).json({
            result: true,
            msg: "Update task successfully",
            data: row,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: false,
            msg: error.message || "Cannot update task",
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id, req.user.id);
        return res.status(200).json({
            result: true,
            msg: "Delete task successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: false,
            msg: error.message || "Cannot delete task",
        });
    }
}

module.exports = {
  getOwnTasks,
  createTask,
  updateTask,
  deleteTask
};
