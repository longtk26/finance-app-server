import mysql, { PoolOptions } from "mysql2";

const access: PoolOptions = {
    host: "localhost",
    user: "root",
    database: "finance_app",
    password: process.env.DB_PASSWORD,
};

const pool = mysql.createPool(access);

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Error when connect to MySQL", err);
        return;
    }

    console.log("Connected to MySQL!");
    connection.release();
});

export default pool.promise();
