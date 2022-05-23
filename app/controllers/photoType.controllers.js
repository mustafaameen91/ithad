const PhotoType = require("../models/photoType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const photoType = new PhotoType({
      photoTypeName: req.body.photoTypeName,
   });

   PhotoType.create(photoType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   PhotoType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   PhotoType.findById(req.params.id, (err, data) => {
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

   PhotoType.updateById(req.params.id, new PhotoType(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   PhotoType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `PhotoType was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   PhotoType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All PhotoTypes were deleted successfully!` });
   });
};
