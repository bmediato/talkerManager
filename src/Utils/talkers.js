const fs = require('fs').promises;
const { resolve } = require('path');

const path = resolve(__dirname, '../talker.json');

const talkers = async () => {
  try {
    const fileContent = await fs.readFile(path);
    const allTalkers = JSON.parse(fileContent);
    return allTalkers;
  } catch (error) {
    return [];
  }
};

module.exports = talkers;