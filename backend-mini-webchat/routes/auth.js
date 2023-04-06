const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const { validate } = require('../validators');
const { rules: registrationRules } = require('../validators/auth/register');
const { rules: loginRules } = require('../validators/auth/login');
router.post('/login',[loginRules, validate], AuthController.login);
router.post(
    '/register',
    [registrationRules, validate],
    AuthController.register,
);

module.exports = router;
