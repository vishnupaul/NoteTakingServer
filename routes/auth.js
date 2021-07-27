const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/authentication');

const { register, login, verifyToken } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', Authentication, verifyToken);

module.exports = router;
