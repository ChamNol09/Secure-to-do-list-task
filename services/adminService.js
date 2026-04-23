const userModel = require('../models/user');
const taskModel = require('../models/task');

const getAllUsers = async () => {
    let rows = await userModel.getAllUsers();
    if (!rows) {
        throw new Error("Cannot get users");
    }
    return rows;
}

const deleteUser = async (id) => {
    let user = await userModel.getUserById(id);
    if (!user) {
        throw new Error("User not found");
    }
    await userModel.deleteUser(id);
}

const getAllTasks = async () => {
    let rows = await taskModel.getAllTasks();
    if (!rows) {
        throw new Error("Cannot get tasks");
    }
    return rows;
}

const deleteTask = async (id ) => {
    let task = await taskModel.getTaskById(id);
    if (!task) {
        throw new Error("Task not found");
    }
    await taskModel.deleteTask(id);
}


module.exports = {
    getAllUsers,
    deleteUser,
    getAllTasks,
    deleteTask
}
