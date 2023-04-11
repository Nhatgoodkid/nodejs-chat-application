const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { validate } = require('../validators');
const { auth } = require('../middleware/auth');

router.post('/update', [auth], UserController.update);

module.exports = router;
