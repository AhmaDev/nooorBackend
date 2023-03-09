var express = require("express");
var router = express.Router();
var request = require("request");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const upload = multer({
  dest: path.join(__dirname, "..", "uploads/"),
});

router.get("/vdo/credentials", (req, res) => {
  var options = {
    method: "PUT",
    url: "https://dev.vdocipher.com/api/videos",
    qs: { title: req.query.title },
    headers: { Authorization: "Apisecret " + process.env.VDOCIPHER_KEY },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
    console.log(body);
  });
});
router.get("/vdo/play/:videoId", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userInfo = jwt.verify(token, process.env.SECRET_KEY);
  var options = {
    method: "POST",
    url: "https://dev.vdocipher.com/api/videos/" + req.params.videoId + "/otp",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Apisecret " + process.env.VDOCIPHER_KEY,
    },
    body: {
      annotate: JSON.stringify([
        {
          type: "rtext",
          text: userInfo.phone,
          alpha: "0.20",
          color: "0xFFFFFF",
          size: "28",
          interval: "1000",
        },
      ]),
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.post("/vdo/upload", upload.single("video"), (req, res) => {
  let clientPayload = JSON.parse(req.body.clientPayload);
  const video = req.file;
  console.log(clientPayload);

  var options = {
    method: "POST",
    url: clientPayload.uploadLink,
    headers: { "content-type": "multipart/form-data" },
    formData: {
      policy: clientPayload.policy,
      key: clientPayload.key,
      "x-amz-signature": clientPayload["x-amz-signature"],
      "x-amz-algorithm": clientPayload["x-amz-algorithm"],
      "x-amz-date": clientPayload["x-amz-date"],
      "x-amz-credential": clientPayload["x-amz-credential"],
      success_action_status: "201",
      success_action_redirect: "",
      file: {
        value: fs.createReadStream(video.path),
        options: { filename: video.path, contentType: null },
      },
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      res.status(500).send("Error");
    } else {
      fs.unlinkSync(video.path); // REMOVE VIDEO FROM SERVER
      res.sendStatus(200);
    }
  });
});

router.delete("/vdo/video/:videoId", (req, res) => {
  var options = {
    method: "DELETE",
    url: "https://dev.vdocipher.com/api/videos",
    qs: { videos: req.params.videoId },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Apisecret " + process.env.VDOCIPHER_KEY,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.sendStatus(200);
  });
});

module.exports = router;
