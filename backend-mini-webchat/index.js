const express = require('express');
const config = require('./config/app');
const route = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

const port = config.appPort;
app.listen(port, () => {
    console.log(`Server on listening on port ${config.appUrl}:${port}`);
});
