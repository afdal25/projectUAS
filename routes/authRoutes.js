const express = require('express');
const { registerAdmin, registerUser, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register/admin', registerAdmin);
router.post('/register/user', registerUser);
router.post('/login', login);

module.exports = router;
