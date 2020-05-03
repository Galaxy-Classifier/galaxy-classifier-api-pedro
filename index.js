const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { setRouter } = require('./loader/routeLoader');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setRouter(app);

const { SERVER_PORT } = process.env;
const serverPort = SERVER_PORT || 3000;

app.listen(serverPort);
console.info(`Listening on port: ${serverPort}`);