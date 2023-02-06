const express = require('express');
const fs = require('fs').promises;
const { resolve } = require('path');

const path = resolve(__dirname, 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkers = async () => {
  try {
    const fileContent = await fs.readFile(path);
    const allTalkers = JSON.parse(fileContent);
    return allTalkers;
  } catch (error) {
    return [];
  }
};

app.get('/talker', async (req, res) => {
  const allTalks = await talkers();
  return res.status(200).send(allTalks);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const allTalks = await talkers();
    const findId = allTalks.find((talk) => talk.id === +id);
    if (!findId) {
     return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
   res.status(200).json(findId);
});