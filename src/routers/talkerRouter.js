const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const talkers = require('../Utils/talkers');
const auth = require('../Middleware/auth');
const validationName = require('../Middleware/validationName');
const validationAge = require('../Middleware/validationAge');
const validationTalk = require('../Middleware/validationTalk');
const validationWatchedAt = require('../Middleware/validationWatchedAt');
const validationRate = require('../Middleware/validationRate');

const { resolve } = path;
const caminho = resolve(__dirname, '../talker.json');
const router = express.Router();

router.get('/', async (req, res) => {
  const allTalks = await talkers();
  return res.status(200).send(allTalks);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allTalks = await talkers();
    const findId = allTalks.find((talk) => talk.id === +id);
    if (!findId) {
     return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
   res.status(200).json(findId);
});

router.post('/', auth, 
validationName,
validationAge,
validationRate, 
validationWatchedAt, 
validationTalk, async (req, res) => {
  try {
    const allTalks = await talkers();
    const { name, age, talk } = req.body;
    const newPerson = {
      id: allTalks[allTalks.length - 1].id + 1,
      name, 
      age,
      talk,
    };
    allTalks.push(newPerson);
    const people = JSON.stringify(allTalks);
    await fs.writeFile(caminho, people);
   return res.status(201).json(newPerson);
  } catch (error) {
  return res.status(500).send({ message: error.message });
  }
});

module.exports = router;