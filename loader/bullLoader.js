const Bull = require('bull');

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

const predictionsQueue = new Bull('predictions-queue', { redis: { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD } });

module.exports = predictionsQueue;