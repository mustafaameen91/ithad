const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  multipleStatements: true,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.getConnection((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

function handleDisconnect() {
  connection = mysql.createPool(dbConfig); // Recreate the connection, since the old one cannot be reused.
  connection.getConnection(function onConnect(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function onError(err) {
    console.log("db error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

connection.on("error", function (err) {
  console.log("db error", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    // Connection to the MySQL server is usually
    handleDisconnect(); // lost due to either server restart, or a
  } else {
    // connection idle timeout (the wait_timeout
    throw err; // server variable configures this)
  }
});

module.exports = connection;
