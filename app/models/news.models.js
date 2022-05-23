const sql = require("./db.js");

const News = function (news) {
   this.title = news.title;
   this.description = news.description;
   this.newsImage = news.newsImage;
};

News.create = (newNews, result) => {
   sql.query("INSERT INTO news SET ?", newNews, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created news: ", { id: res.insertId, ...newNews });
      result(null, { id: res.insertId, ...newNews });
   });
};

News.getAll = (result) => {
   sql.query(
      "SELECT *, DATE_FORMAT(newsDate,'%d/%m/%Y') AS newsDateFormatter FROM news",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("news: ", res);
         let formattedData = res.map((news) => {
            return { ...news, fromBank: false };
         });
         result(null, formattedData);
      }
   );
};

News.findById = (newsId, result) => {
   sql.query(`SELECT * FROM news WHERE idNews = ${newsId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found news: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

News.updateById = (id, news, result) => {
   sql.query("UPDATE news SET ? WHERE idNews = ?", [news, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated news: ", { id: id, ...news });
      result(null, { id: id, ...news });
   });
};

News.remove = (id, result) => {
   sql.query("DELETE FROM news WHERE idNews = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted news with id: ", id);
      result(null, res);
   });
};

module.exports = News;
