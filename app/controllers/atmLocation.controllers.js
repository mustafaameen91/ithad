const AtmLocation = require("../models/atmLocation.models.js");
const axios = require("axios");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const atmLocation = new AtmLocation({
    atmName: req.body.atmName,
    lang: req.body.lang,
    lat: req.body.lat,
    address: req.body.address,
    supportNumber: req.body.supportNumber,
  });

  AtmLocation.create(atmLocation, (err, data) => {
    if (err) res.status(err.code).send(err);
    else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  var data = JSON.stringify({
    user_name: "api_service",
    password: "api_service",
  });

  axios({
    method: "post",
    url: "http://unionbank.iq:8080/api/token",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then(function (response1) {
      console.log(JSON.stringify(response1.data));
      axios({
        method: "get",
        url: "http://unionbank.iq:8080/api/atms",
        headers: {
          Authorization: `Bearer ${response1.data}`,
        },
      })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          let locationFormat = response.data.map((location) => {
            let splitArray = location.atM_Location.split("!");

            return {
              lang: `${splitArray[6].slice(2, splitArray[5].length)}`,
              lat: `${splitArray[5].slice(2, splitArray[5].length)}`,
              supportNumber: location.atM_Support_Phone,
              address: location.atM_Address_Ar,
              atmName: location.atM_Name_Ar,
            };
          });

          AtmLocation.getAll((err, data) => {
            if (err) res.status(err.code).send(err);
            else res.send([...data, ...locationFormat]);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      AtmLocation.getAll((err, data) => {
        if (err) res.status(err.code).send(err);
        else res.send(data);
      });
    });
};

exports.findOne = (req, res) => {
  AtmLocation.findById(req.params.id, (err, data) => {
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

  AtmLocation.updateById(req.params.id, new AtmLocation(req.body), (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  AtmLocation.remove(req.params.id, (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `AtmLocation was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  AtmLocation.removeAll((err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `All AtmLocations were deleted successfully!` });
  });
};
