const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { validate } = require('../validators');
const { auth } = require('../middleware/auth');
const { rules: updateRules } = require('../validators/user/update');
const { userFile } = require('../middleware/fileUpload');
router.post(
    '/update',
    [auth, userFile, updateRules, validate],
    UserController.update,
);

module.exports = router;
