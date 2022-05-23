const sql = require("./db.js");

const PhotoType = function (photoType) {
   this.photoTypeName = photoType.photoTypeName;
};

PhotoType.create = (newPhotoType, result) => {
   sql.query("INSERT INTO photoType SET ?", newPhotoType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created photoType: ", { id: res.insertId, ...newPhotoType });
      result(null, { id: res.insertId, ...newPhotoType });
   });
};

PhotoType.getAll = (result) => {
   sql.query("SELECT * FROM photoType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("photoType: ", res);
      result(null, res);
   });
};

PhotoType.findById = (photoTypeId, result) => {
   sql.query(
      `SELECT * FROM photoType WHERE idPhotoType = ${photoTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found photoType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

PhotoType.updateById = (id, photoType, result) => {
   sql.query(
      "UPDATE photoType SET ? WHERE idPhotoType = ?",
      [photoType, id],
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

         console.log("updated photoType: ", { id: id, ...photoType });
         result(null, { id: id, ...photoType });
      }
   );
};

PhotoType.remove = (id, result) => {
   sql.query("DELETE FROM photoType WHERE idPhotoType = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted photoType with id: ", id);
      result(null, res);
   });
};

module.exports = PhotoType;
