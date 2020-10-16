import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const router = express.Router();

router.get('/', async (_req, res) => {
  const data = JSON.parse(await readFile('./grades.json'));
  console.log(data);
  delete data.nextId;
  res.send(data);
});

router.get('/:id', async (req, res) => {
  try {
    let file = JSON.parse(await readFile('./grades.json'));
    file = file.grades.find((grade) => parseInt(req.params.id) == grade.id);
    res.send(file);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/total/:student/:subject', async (req, res) => {
  try {
    let file = JSON.parse(await readFile('./grades.json'));
    file = file.grades
      .filter((grade) => req.params.student === grade.student)
      .filter((grade) => req.params.subject === grade.subject);
    const total = file.reduce((acumulator, grade) => {
      return (acumulator += grade.value);
    }, 0);

    res.send({ total });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/mean/:subject/:type', async (req, res) => {
  try {
    let file = JSON.parse(await readFile('./grades.json'));
    file = file.grades
      .filter((grade) => req.params.subject === grade.subject)
      .filter((grade) => req.params.type === grade.type);
    const total = file.reduce((acumulator, grade) => {
      return (acumulator += grade.value);
    }, 0);
    const mean = total / file.length;
    res.send({ mean, grades: file });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/best/:subject/:type', async (req, res) => {
  try {
    let file = JSON.parse(await readFile('./grades.json'));
    file = file.grades
      .filter((grade) => req.params.subject === grade.subject)
      .filter((grade) => req.params.type === grade.type);

    file.sort((a, b) => (a.value - b.value) * -1);
    res.send({ grades: file });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const file = JSON.parse(await readFile('./grades.json'));
    const data = {
      id: file.nextId++,
      student: req.body.student,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
    };
    data.timestamp = new Date();
    file.grades.push(data);
    writeFile('./grades.json', JSON.stringify(file));
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const file = JSON.parse(await readFile('./grades.json'));
    const index = file.grades.findIndex(
      (grade) => parseInt(req.params.id) === grade.id
    );
    if (index >= 0) {
      const grade = file.grades[index];
      if (req.body.student) grade.student = req.body.student;
      if (req.body.subject) grade.subject = req.body.subject;
      if (req.body.type) grade.type = req.body.type;
      if (req.body.value >= 0) grade.value = req.body.value;
      grade.timestamp = new Date();
      file.grades[index] = grade;
      await writeFile('./grades.json', JSON.stringify(file));
      res.send(grade);
    } else {
      throw { message: 'Grade não encontrada!' };
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let file = JSON.parse(await readFile('./grades.json'));
    file.grades = file.grades.filter(
      (grade) => parseInt(req.params.id) !== grade.id
    );
    await writeFile('./grades.json', JSON.stringify(file));
    res.send(file);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
