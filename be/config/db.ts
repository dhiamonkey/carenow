import mysql from "mysql2";
import "dotenv/config";

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,
  port: (Number(process.env.MYSQL_PORT) as number) || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

export default connection;
