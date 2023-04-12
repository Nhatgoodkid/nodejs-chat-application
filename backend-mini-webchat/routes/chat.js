const express = require('express');
const ChatController = require('../controllers/ChatController');
const router = express.Router();
const { validate } = require('../validators');
const { auth } = require('../middleware/auth');

router.post('/create', [auth], ChatController.create);
router.get('/', [auth], ChatController.index);

module.exports = router;
