var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const fs = require("fs");
const { sendMessage } = require("./middlewares/notifications.middlewares");
var app = express();

// app.use(history());

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

var apiBaseUrl = "/api/";

app.use(apiBaseUrl, require("./routes/index"));
app.use(apiBaseUrl, require("./routes/user.routes"));
app.use(apiBaseUrl, require("./routes/session.routes"));
app.use(apiBaseUrl, require("./routes/assistance.routes"));
app.use(apiBaseUrl, require("./routes/avatar.routes"));
app.use(apiBaseUrl, require("./routes/category.routes"));
app.use(apiBaseUrl, require("./routes/comment.routes"));
app.use(apiBaseUrl, require("./routes/course.routes"));
app.use(apiBaseUrl, require("./routes/courseChapter.routes"));
app.use(apiBaseUrl, require("./routes/courseDelegate.routes"));
app.use(apiBaseUrl, require("./routes/courseGroup.routes"));
app.use(apiBaseUrl, require("./routes/courseStudent.routes"));
app.use(apiBaseUrl, require("./routes/courseQuiz.routes"));
app.use(apiBaseUrl, require("./routes/delegate.routes"));
app.use(apiBaseUrl, require("./routes/lesson.routes"));
app.use(apiBaseUrl, require("./routes/province.routes"));
app.use(apiBaseUrl, require("./routes/student.routes"));
app.use(apiBaseUrl, require("./routes/subCategory.routes"));
app.use(apiBaseUrl, require("./routes/teacher.routes"));
app.use(apiBaseUrl, require("./routes/vdoCipher.routes"));
app.use(apiBaseUrl, require("./routes/setting.routes"));
app.use(apiBaseUrl, require("./routes/lessonFile.routes"));
app.use(apiBaseUrl, require("./routes/lessonFileAnswerImage.routes"));
app.use(apiBaseUrl, require("./routes/lessonFileAnswer.routes"));

app.get("/api/version", (req, res) => res.json({ version: "1.0.0" }));
app.get("/api/sendMessage", (req, res) => {
  sendMessage({
    title: "Hello",
    body: "world",
    recievers: [
      "fvqpY4sLQhWobooM3UOq7C:APA91bFFVpohOY_w_jE9KsV2KlYVPmPriUy6ruv9MyoA0A2vJMgo9sFBewkIr_iCiaTbPTf94pNViIzNXX4TOzoLTqwxoXBvaIaSNBzjrCQu7r_CYP52l4j75LdAcuKq_x3p1z1hx5wc",
    ],
  });
  res.json({ version: "1.0.0" });
});

app.get("/api/files/:path/:file", function (request, response) {
  let file = request.params.file;
  var extension = file.split(".").pop();
  var tempFile = path.join(
    __dirname,
    "uploads/" + request.params.path + "/" + file,
  );
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
      case "pdf":
        contentType = "application/pdf";
        isImage = 2;
        break;
      case "jpeg":
        contentType = "image/jpeg";
        isImage = 1;
        break;
    }
    if (
      ["jpg", "jpeg", "png", "gif", "pdf", "mp4", "mp3"].includes(extension)
    ) {
      response.contentType(contentType);
      response.send(data);
    } else {
      response.download(tempFile);
    }
  });
});

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
