const pool = require('../configs/db');

const createTask = async (body, user_id) => {
    let arr = [
        body.title,
        body.description,
        body.status,
        user_id
    ];
    const [result] = await pool.query(
        "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
        arr
    );
    return result.insertId;
};

const getTaskById = async (id) => {
    const [row] = await pool.query(
        "SELECT id, title, description, status, user_id, created_at, updated_at FROM tasks WHERE id = ?",
        [id]
    );
    return row[0];
}

const getOwnTasks = async (id) => {
    const [rows] = await pool.query(
        "SELECT id, title, description, status, user_id, created_at, updated_at FROM tasks WHERE user_id = ?",
        [id]
    );
    return rows;
}

const getAllTasks = async () => {
    const [rows] = await pool.query(
        "SELECT id, title, description, status, user_id, created_at, updated_at FROM tasks"
    );
    return rows;
}

const updateTask = async (body, id, user_id) => {
    let arr = [
        body.title,
        body.description,
        body.status,
        id,
        user_id
    ];
    let [result] =await pool.query(
        "Update tasks set title = ?, description = ?, status = ? where id = ? and user_id = ?",
        arr
    );
    return result;
}

const deleteTask = async (id) => {
    await pool.query("delete from tasks where id = ?", [id]);
}


module.exports = {
    createTask,
    getTaskById,
    getOwnTasks,
    getAllTasks,
    updateTask,
    deleteTask
}