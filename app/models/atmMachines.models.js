const sql = require("./db.js");
const axios = require("axios");

const AtmMachines = function (atmMachines) {
   this.atmMachinesName = atmMachines.atmMachinesName;
};

AtmMachines.create = (newAtmMachines, result) => {
   sql.query("INSERT INTO atmMachines SET ?", newAtmMachines, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created atmMachines: ", {
         id: res.insertId,
         ...newAtmMachines,
      });
      result(null, { id: res.insertId, ...newAtmMachines });
   });
};

AtmMachines.getAll = (result) => {
   axios
      .get("http://www.unionbank.iq:8080/api/atms")
      .then(function (response) {
         // handle success
         result(null, response);
         console.log(response);
      })
      .catch(function (error) {
         // handle error
         result(err, null);
         console.log(error);
      });
   //    sql.query("SELECT * FROM atmMachines", (err, res) => {
   //       if (err) {
   //          console.log("error: ", err);
   //          result(null, err);
   //          return;
   //       }

   //       console.log("atmMachines: ", res);
   //       result(null, res);
   //    });
};

AtmMachines.findById = (atmMachinesId, result) => {
   sql.query(
      `SELECT * FROM atmMachines WHERE idAtmMachines = ${atmMachinesId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found atmMachines: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

AtmMachines.updateById = (id, atmMachines, result) => {
   sql.query(
      "UPDATE atmMachines SET ? WHERE idAtmMachines = ?",
      [atmMachines, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated atmMachines: ", { id: id, ...atmMachines });
         result(null, { id: id, ...atmMachines });
      }
   );
};

AtmMachines.remove = (id, result) => {
   sql.query(
      "DELETE FROM atmMachines WHERE idAtmMachines = ?",
      id,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted atmMachines with id: ", id);
         result(null, res);
      }
   );
};

module.exports = AtmMachines;
