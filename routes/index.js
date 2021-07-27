const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});
router.use('/auth', require('./auth'));

router.use('/notes', require('./notes'));

module.exports = router;
