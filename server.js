const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const history = require("connect-history-api-fallback");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false, limit: "2gb" }));

function generateRandomName(length, patientId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         patientId;
   }
   return result;
}

app.get("/api/attachment/:file", function (request, response) {
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = `./app/attachments/${file}`;

   fs.readFile(tempFile, function (err, data) {
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

app.post("/api/upload", function (req, res) {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
   }

   let uploadedFile = req.files.attachment;
   let photoName = generateRandomName(5, 3);
   var filename = uploadedFile.name;
   var ext = filename.substr(filename.lastIndexOf(".") + 1);
   let imagePath = `${__dirname}/app/attachments/${photoName}.${ext}`;

   uploadedFile.mv(imagePath, function (err) {
      if (err) return res.status(500).send(err);

      res.send({ imagePath: `attachment/${photoName}.${ext}` });
   });
});

require("./app/routes/role.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/photoType.routes.js")(app);
require("./app/routes/personalPhoto.routes.js")(app);
require("./app/routes/atmLocation.routes.js")(app);
require("./app/routes/atmMachines.routes.js")(app);
require("./app/routes/news.routes.js")(app);

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);

app.use(staticFileMiddleware);

app.listen(4300, () => {
   console.log("app listening on port 4300");
});
