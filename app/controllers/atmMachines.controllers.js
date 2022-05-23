const AtmMachines = require("../models/atmMachines.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const atmMachines = new AtmMachines({
      atmMachinesName: req.body.atmMachinesName,
   });

   AtmMachines.create(atmMachines, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   AtmMachines.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   AtmMachines.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AtmMachines.updateById(
      req.params.id,
      new AtmMachines(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   AtmMachines.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `AtmMachines was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   AtmMachines.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All AtmMachiness were deleted successfully!` });
   });
};
