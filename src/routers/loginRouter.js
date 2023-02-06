const express = require('express');
const generateToken = require('../Utils/generateToken');
const validationLogin = require('../Middleware/validationLogin');

const router = express.Router();
router.use(express.json());

router.post('/', validationLogin, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});
module.exports = router;