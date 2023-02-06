const express = require('express');

const router = express.Router();

const talkerRouter = require('./talkerRouter');
const loginRouter = require('./loginRouter');

router.use('/talker', talkerRouter);
router.use('/login', loginRouter);

module.exports = router;