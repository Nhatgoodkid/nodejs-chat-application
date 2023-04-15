const User = require('../models').User;
const sequelize = require('sequelize');

class UserController {
    async update(req, res) {
        if (req.file) {
            req.body.avatar = req.file.filename;
        }

        if (
            typeof req.body.avatar !== 'undefined' &&
            req.body.avatar.length === 0
        )
            delete req.body.avatar;

        try {
            const [rows, result] = await User.update(req.body, {
                where: {
                    id: req.user.id,
                },
                returning: true,
                individualHooks: true,
            });

            const user = result[0].get({ raw: true });
            console.log(user);
            user.avatar = result[0].avatar;
            delete user.password;

            return res.send(user);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async search(req, res) {
        try {
            const users = await User.findAll({
                where: {
                    [sequelize.Op.or]: {
                        namesConcated: sequelize.where(
                            sequelize.fn(
                                'concat',
                                sequelize.col('firstName'),
                                ' ',
                                sequelize.col('lastName'),
                            ),
                            {
                                [sequelize.Op.ilike]: `%${req.body.term}%`,
                            },
                        ),
                        email: {
                            [sequelize.Op.ilike]: `%${req.body.term}%`,
                        },
                    },
                    [sequelize.Op.not]: {
                        id: req.user.id,
                    },
                },
                limit: 10,
            });

            return res.json(users);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}
module.exports = new UserController();
