import mysql from "mysql2";

const dbConnection = mysql.createConnection({
  uri: `mysql://root:password@localhost:3306/file_share`,
  //   user: "root",
  //   password: "password",
  //   database: "file_share",
});

export default dbConnection;
