const taskService = require("../services/taskService");

const getOwnTasks = async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let {status} = req.query;

    page = Number.isNaN(page) ||  page < 1 ? 1 : page;
    limit = Number.isNaN(limit)||limit < 1 || limit > 100 ? 10 : limit;
    
    let result = await taskService.getOwnTasks({
      id: req.user.id,
      page,
      limit,
      status
    });
    return res.status(200).json({
      result: true,
      msg: "Get own tasks successfully",
      data: result.rows,
      pagination: result.pagination
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
    let row = await taskService.updateTask(
      req.body,
      req.params.id,
      req.user.id,
    );
    return res.status(200).json({
      result: true,
      msg: "Update task successfully",
      data: row,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message || "Cannot update task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    return res.status(200).json({
      result: true,
      msg: "Delete task successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      result: false,
      msg: error.message || "Cannot delete task",
    });
  }
};

module.exports = {
  getOwnTasks,
  createTask,
  updateTask,
  deleteTask,
};
