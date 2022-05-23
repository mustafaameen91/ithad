module.exports = (app) => {
   const user = require("../controllers/user.controllers.js");

   app.post("/api/addUser", user.create);

   app.get("/api/users", user.findAll);

   app.get("/api/statistics", user.findStatistics);

   app.get("/api/user/:id", user.findOne);

   app.get("/api/usersRole/:id", user.findOneByRoleId);

   app.post("/api/login", user.login);

   app.put("/api/user/:id", user.update);

   app.delete("/api/user/:id", user.delete);

   app.delete("/api/users", user.deleteAll);
};
