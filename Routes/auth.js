const express = require('express');
const router  = express.Router();

const { login, register } = require('../Controllers/auth.js');

router.post('/register', register);
router.post('/login', login);

// router.route('/').post(register, login)

module.exports = router; 