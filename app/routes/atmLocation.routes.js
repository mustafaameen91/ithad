module.exports = (app) => {
   const atmLocation = require("../controllers/atmLocation.controllers.js");

   app.post("/api/addAtmLocation", atmLocation.create);

   app.get("/api/atmLocations", atmLocation.findAll);

   app.get("/api/atmLocation/:id", atmLocation.findOne);

   app.put("/api/atmLocation/:id", atmLocation.update);

   app.delete("/api/atmLocation/:id", atmLocation.delete);

   app.delete("/api/atmLocations", atmLocation.deleteAll);
};
