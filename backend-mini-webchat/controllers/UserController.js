const User = require('../models').User;
const sequelize = require('sequelize');

class UserController {
    update(req, res) {
        return res.send('Update');
    }
}
module.exports = new UserController();
