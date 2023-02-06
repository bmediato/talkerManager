const express = require('express');
const talkers = require('../Utils/talkers');

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

module.exports = router;