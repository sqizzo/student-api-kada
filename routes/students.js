var express = require("express");
var router = express.Router();
const students = require("../data/students");

router.get("/", (req, res, next) => {
  res.send(students);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const filteredData = students.filter((student) => student.id === id);

  res.send(filteredData);
});

module.exports = router;
