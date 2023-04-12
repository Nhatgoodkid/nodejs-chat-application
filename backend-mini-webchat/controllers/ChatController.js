const models = require('../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require('sequelize');
class ChatController {
    async index(req, res) {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
            include: [
                {
                    model: Chat,
                    include: [
                        {
                            model: User,
                            where: {
                                [Op.not]: {
                                    id: req.user.id,
                                },
                            },
                        },
                        {
                            model: Message,
                            limit: 20,
                            order: [['id', 'DESC']],
                        },
                    ],
                },
            ],
        });

        return res.json(user.Chats);
    }

    async create(req, res) {
        const { partnerId } = req.body;

        const t = await models.sequelize.transaction();

        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id,
                },
                include: [
                    {
                        model: Chat,
                        where: {
                            type: 'dual',
                        },
                        include: [
                            {
                                model: ChatUser,
                                where: {
                                    userId: partnerId,
                                },
                            },
                        ],
                    },
                ],
            });

            if (user && user.Chats.length > 0) {
                return res.status(403).json({
                    status: 'Error',
                    message: 'Chat with this user already exist!',
                });
            }

            const chat = await Chat.create(
                { type: 'dual' },
                { transaction: t },
            );

            await ChatUser.bulkCreate(
                [
                    {
                        chatId: chat.id,
                        userId: req.user.id,
                    },
                    {
                        chatId: chat.id,
                        userId: partnerId,
                    },
                ],
                { transaction: t },
            );

            await t.commit();

            const chatNew = await Chat.findOne({
                where: {
                    id: chat.id,
                },
                include: [
                    {
                        model: User,
                        where: {
                            [Op.not]: {
                                id: req.user.id,
                            },
                        },
                    },
                    {
                        model: Message,
                    },
                ],
            });

            return res.json(chatNew);
        } catch (e) {
            await t.rollback();
            return res
                .status(500)
                .json({ status: 'Error', message: e.message });
        }
    }

    async messages(req, res) {
        const limit = 10;
        const page = req.query.page || 1;
        const offset = page > 1 ? page * limit : 0;

        const messages = await Message.findAndCountAll({
            where: {
                chatId: req.query.id,
            },
            limit,
            offset,
        });

        const totalPages = Math.ceil(messages.count / limit);

        if (page > totalPages) return res.json({ data: { messages: [] } });

        const result = {
            messages: messages.rows,
            pagination: {
                page,
                totalPages,
            },
        };

        return res.json(result);
    }
}

module.exports = new ChatController();
