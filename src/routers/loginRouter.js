const express = require('express');
const generateToken = require('../Utils/generateToken');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (![email, password].includes(undefined)) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
});
module.exports = router;