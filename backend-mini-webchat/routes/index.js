const authRouter = require('./auth');
const homeRouter = require('./home');
const userRouter = require('./user');
const chatRouter = require('./chat');
function route(app) {
    app.use('/chats', chatRouter);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;
