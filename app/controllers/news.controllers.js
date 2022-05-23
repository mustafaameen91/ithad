const News = require("../models/news.models.js");
const axios = require("axios");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const news = new News({
      title: req.body.title,
      description: req.body.description,
      newsImage: req.body.newsImage,
   });

   News.create(news, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};
exports.findAllMix = (req, res) => {

   var data = JSON.stringify({
      "user_name": "api_service",
      "password": "api_service"
    });
    
    
    axios({
      method: 'post',
      url: 'http://unionbank.iq:8080/api/token',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    })
    .then(function (response1) {
      console.log(JSON.stringify(response1.data));
      axios({
          method: 'get',
          url: 'http://unionbank.iq:8080/api/news',
          headers: { 
            'Authorization': `Bearer ${response1.data}`
          }
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          let externalNews = response.data.reverse().map((news) => {
            return {
               idNews: news.n_id,
               title: news.title_AR,
               description: news.description_AR
                  .replace(/(<([^>]+)>)/gi, "")
                  .replace(/\&nbsp;|&rlm;|\r?\n|\r/gi, ""),
               newsImage: `https://unionbank.iq${news.news_Icon.replace(/~/g, "")}`,
               newsDate: news.date,
               fromBank: true,
            };
         });

         News.getAll((err, data) => {
            if (err) res.status(err.code).send(err);
            else res.send([...data, ...externalNews]);
         });
          
  
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      News.getAll((err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      });
    });
};

exports.findAll = (req, res) => {
   News.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   News.findById(req.params.id, (err, data) => {
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

   News.updateById(req.params.id, new News(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   News.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `News was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   News.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Newss were deleted successfully!` });
   });
};
