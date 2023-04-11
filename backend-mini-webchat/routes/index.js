const authRouter = require('./auth');
const homeRouter = require('./home');
const userRouter = require('./user');
function route(app) {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;
