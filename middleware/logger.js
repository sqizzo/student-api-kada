const express = require("express");
const app = express();

const logger = (req, res, next) => {
  req.time = new Date();

  console.log(
    `------------------------------LOGGER------------------------------`
  );
  console.log(
    `Method: ${req.method} | Hostname: ${req.hostname} | Time: ${req.time}| Path: ${req.path}`
  );

  next();
};

module.exports = logger;
