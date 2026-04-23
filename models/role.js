const pool = require("../configs/db");

const getRoleById = async (id) => {
    const [row] = await pool.query(
        "select id, name from roles where id = ?",
        [id]
    );
    return row[0];
}

module.exports = {
    getRoleById
}