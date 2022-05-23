const sql = require("./db.js");

const User = function (user) {
   this.userName = user.userName;
   this.sirName = user.sirName;
   this.phone = user.phone;
   this.countryCode = user.countryCode;
   this.password = user.password;
   this.roleId = user.roleId;
};

User.create = (newUser, result) => {
   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
   });
};

User.getStatistics = (result) => {
   sql.query(
      "SELECT (SELECT COUNT(user.idUser) FROM user ) AS users , (SELECT COUNT(news.idNews) FROM news) AS news ,(SELECT COUNT(atmLocation.idAtmLocation) FROM atmLocation ) AS atms",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("user: ", res);
         result(null, res[0]);
      }
   );
};

User.getAll = (result) => {
   sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("user: ", res);
      result(null, res);
   });
};

User.findByIdRole = (roleId, result) => {
   sql.query(`SELECT * FROM user WHERE roleId = ${roleId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("found user: ", res);
      result(null, res);
   });
};

User.findById = (userId, result) => {
   sql.query(`SELECT * FROM user WHERE idUser = ${userId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found user: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

User.updateById = (id, user, result) => {
   sql.query("UPDATE user SET ? WHERE idUser = ?", [user, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
   });
};

User.loginUser = (phone, password, result) => {
   sql.query(
      `SELECT * FROM user WHERE phone = "${phone}" AND password = "${password}"`,
      (err, res) => {
         if (err) {
            result(err, null);
            return;
         }

         if (res.length == 0) {
            result({ kind: "not_found" }, null);
            return;
         }
         result(null, res[0]);
      }
   );
};

User.remove = (id, result) => {
   sql.query("DELETE FROM user WHERE idUser = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
   });
};

module.exports = User;
