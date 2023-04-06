const authRouter = require('./auth');
const homeRouter = require('./home');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;
