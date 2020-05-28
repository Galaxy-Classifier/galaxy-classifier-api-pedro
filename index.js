const logger = require('./logger');
require('./loader/grpcLoader');

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

setRouter(app, logger);

const { SERVER_PORT } = process.env;
const serverPort = SERVER_PORT || 5001;

app.listen(serverPort);
logger.info(`Pedro is alive @ ${serverPort}`);

process.on('exit', (code) => {
  logger.info(`NODE PROCESS EXITED WITH CODE ${code}`);
});