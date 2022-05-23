const sql = require("./db.js");

const PersonalPhoto = function (personalPhoto) {
   this.photo = personalPhoto.photo;
   this.photoTypeId = personalPhoto.photoTypeId;
   this.userId = personalPhoto.userId;
};

PersonalPhoto.create = (newPersonalPhoto, result) => {
   sql.query(
      "INSERT INTO personalPhoto SET ?",
      newPersonalPhoto,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created personalPhoto: ", {
            id: res.insertId,
            ...newPersonalPhoto,
         });
         result(null, { id: res.insertId, ...newPersonalPhoto });
      }
   );
};

PersonalPhoto.getAll = (result) => {
   sql.query("SELECT * FROM personalPhoto", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("personalPhoto: ", res);
      result(null, res);
   });
};

PersonalPhoto.findById = (personalPhotoId, result) => {
   sql.query(
      `SELECT * FROM personalPhoto WHERE idPersonalPhoto = ${personalPhotoId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found personalPhoto: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

PersonalPhoto.updateById = (id, personalPhoto, result) => {
   sql.query(
      "UPDATE personalPhoto SET ? WHERE idPersonalPhoto = ?",
      [personalPhoto, id],
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

         console.log("updated personalPhoto: ", { id: id, ...personalPhoto });
         result(null, { id: id, ...personalPhoto });
      }
   );
};

PersonalPhoto.remove = (id, result) => {
   sql.query(
      "DELETE FROM personalPhoto WHERE idPersonalPhoto = ?",
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

         console.log("deleted personalPhoto with id: ", id);
         result(null, res);
      }
   );
};

module.exports = PersonalPhoto;
