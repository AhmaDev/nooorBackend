var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const fs = require("fs");
var app = express();

// app.use(history());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.get("/api/version", (req, res) => res.json({ version: "1.0.0" }));

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
