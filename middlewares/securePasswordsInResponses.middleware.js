"use strict";
const mung = require("express-mung");

/* Remove any classified information from the response. */
function redact(req, res, next) {
  if (body.password) body.password = "****";
  // ...
  return body;
}

exports = mung.json(redact);
