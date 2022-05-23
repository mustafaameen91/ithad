const sql = require("./db.js");

const AtmLocation = function (atmLocation) {
   this.atmName = atmLocation.atmName;
   this.lang = atmLocation.lang;
   this.lat = atmLocation.lat;
   this.address = atmLocation.address;
   this.supportNumber = atmLocation.supportNumber;
};

AtmLocation.create = (newAtmLocation, result) => {
   sql.query("INSERT INTO atmLocation SET ?", newAtmLocation, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created atmLocation: ", {
         id: res.insertId,
         ...newAtmLocation,
      });
      result(null, { id: res.insertId, ...newAtmLocation });
   });
};

AtmLocation.getAll = (result) => {
   sql.query("SELECT * FROM atmLocation", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("atmLocation: ", res);
      result(null, res);
   });
};

AtmLocation.findById = (atmLocationId, result) => {
   sql.query(
      `SELECT * FROM atmLocation WHERE idAtmLocation = ${atmLocationId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found atmLocation: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

AtmLocation.updateById = (id, atmLocation, result) => {
   sql.query(
      "UPDATE atmLocation SET ? WHERE idAtmLocation = ?",
      [atmLocation, id],
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

         console.log("updated atmLocation: ", { id: id, ...atmLocation });
         result(null, { id: id, ...atmLocation });
      }
   );
};

AtmLocation.remove = (id, result) => {
   sql.query(
      "DELETE FROM atmLocation WHERE idAtmLocation = ?",
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

         console.log("deleted atmLocation with id: ", id);
         result(null, res);
      }
   );
};

module.exports = AtmLocation;
