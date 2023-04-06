require('dotenv').config();

module.exports = {
    appKey: process.env.APPKEY,
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,
};
