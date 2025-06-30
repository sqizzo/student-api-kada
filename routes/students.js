var express = require("express");
var router = express.Router();
const students = require("../data/students");
const { customAlphabet } = require("nanoid");

router.get("/", (req, res, next) => {
  const minGrade = req.query.minGrade;
  const sort = req.query.sort;

  let result = students;

  if (minGrade !== undefined) {
    result = result.filter((student) => student.grade >= Number(minGrade));
  }

  if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "grade") {
    result.sort((a, b) => b.grade - a.grade);
  }

  res.send(result);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const filteredData = students.find((student) => student.id === id);

  if (!filteredData) {
    res.status(404).json({ error: "Student was not found" });
  }

  res.send(filteredData);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;

  const studentIndex = students.findIndex((student) => student.id === id);
  const { name, grade } = req.body;

  if (studentIndex === -1) {
    res.status(404).json({ error: "Student was not found" });
  } else {
    if (name) {
      students[studentIndex].name = name;
    }

    if (grade !== undefined) {
      students[studentIndex].grade = grade;
    }

    res.status(200).json(students[studentIndex]);
  }
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

  res.status(201).json(students);
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    res.status(404).json({ error: "Student was not found" });
  }

  students.splice(studentIndex, 1);
  res.status(201).json(students);
});

module.exports = router;
