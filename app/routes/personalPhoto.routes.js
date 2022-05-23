module.exports = (app) => {
   const personalPhoto = require("../controllers/personalPhoto.controllers.js");

   app.post("/api/addPersonalPhoto", personalPhoto.create);

   app.get("/api/personalPhotos", personalPhoto.findAll);

   app.get("/api/personalPhoto/:id", personalPhoto.findOne);

   app.put("/api/personalPhoto/:id", personalPhoto.update);

   app.delete("/api/personalPhoto/:id", personalPhoto.delete);

   app.delete("/api/personalPhotos", personalPhoto.deleteAll);
};
