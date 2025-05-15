import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306, 
  user: "root",
  password: "SQL123456", 
  database: "social_app",
});
