var express = require("express");
var router = express.Router();
const students = require("../data/students");
const { customAlphabet } = require("nanoid");

router.get("/", (req, res, next) => {
  res.send(students);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const filteredData = students.find((student) => student.id === id);

  if (!filteredData) {
    res.status(404).json({ error: "Student was not found" });
  }

  res.send(filteredData);
});

router.post("/", (req, res, next) => {
  const { name, grade } = req.body;

  if (!name || grade === undefined) {
    return res.status(400).json({ error: "Name and grade are required" });
  }

  const nanoid = customAlphabet("1234567890", 5);
  const newStudent = {
    id: nanoid(),
    name,
    grade,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

module.exports = router;
