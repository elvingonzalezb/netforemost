const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.checkHealth)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
