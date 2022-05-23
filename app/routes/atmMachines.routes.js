module.exports = (app) => {
   const atmMachines = require("../controllers/atmMachines.controllers.js");

   app.post("/api/addAtmMachines", atmMachines.create);

   app.get("/api/atmMachines", atmMachines.findAll);

   app.get("/api/atmMachine/:id", atmMachines.findOne);

   app.put("/api/atmMachine/:id", atmMachines.update);

   app.delete("/api/atmMachine/:id", atmMachines.delete);

   app.delete("/api/atmMachines", atmMachines.deleteAll);
};
