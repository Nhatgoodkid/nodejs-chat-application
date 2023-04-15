const express = require('express');
const ChatController = require('../controllers/ChatController');
const router = express.Router();
const { validate } = require('../validators');
const { auth } = require('../middleware/auth');
const { chatFile } = require('../middleware/fileUpload');

router.post('/add-user-to-group', auth, ChatController.addUserToGroup);
router.delete('/:id', [auth], ChatController.deleteChat);
router.get('/messages', [auth], ChatController.messages);
router.post('/create', [auth], ChatController.create);
router.post('/upload-image', [auth, chatFile], ChatController.imageUpload);
router.get('/', [auth], ChatController.index);

module.exports = router;
