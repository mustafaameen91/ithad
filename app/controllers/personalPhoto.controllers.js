const PersonalPhoto = require("../models/personalPhoto.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const personalPhoto = new PersonalPhoto({
      photo: req.body.photo,
      photoTypeId: req.body.photoTypeId,
      userId: req.body.userId,
   });

   PersonalPhoto.create(personalPhoto, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   PersonalPhoto.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   PersonalPhoto.findById(req.params.id, (err, data) => {
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

   PersonalPhoto.updateById(
      req.params.id,
      new PersonalPhoto(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   PersonalPhoto.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `PersonalPhoto was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   PersonalPhoto.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All PersonalPhotos were deleted successfully!` });
   });
};
