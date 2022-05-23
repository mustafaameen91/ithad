module.exports = (app) => {
   const news = require("../controllers/news.controllers.js");

   app.post("/api/addNews", news.create);

   app.get("/api/allNews", news.findAll);

   app.get("/api/mixNews", news.findAllMix);

   app.get("/api/news/:id", news.findOne);

   app.put("/api/news/:id", news.update);

   app.delete("/api/news/:id", news.delete);

   app.delete("/api/allNews", news.deleteAll);
};
