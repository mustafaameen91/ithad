module.exports = (app) => {
   const photoType = require("../controllers/photoType.controllers.js");

   app.post("/api/addPhotoType", photoType.create);

   app.get("/api/photoTypes", photoType.findAll);

   app.get("/api/photoType/:id", photoType.findOne);

   app.put("/api/photoType/:id", photoType.update);

   app.delete("/api/photoType/:id", photoType.delete);

   app.delete("/api/photoTypes", photoType.deleteAll);
};
