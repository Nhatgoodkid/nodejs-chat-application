const express = require('express');
const ChatController = require('../controllers/ChatController');
const router = express.Router();
const { validate } = require('../validators');
const { auth } = require('../middleware/auth');

router.delete('/:id', [auth], ChatController.deleteChat);
router.get('/messages', [auth], ChatController.messages);
router.post('/create', [auth], ChatController.create);
router.get('/', [auth], ChatController.index);

module.exports = router;
