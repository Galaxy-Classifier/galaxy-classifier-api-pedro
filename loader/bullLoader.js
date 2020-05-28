const Bull = require('bull');
const processClassificationRequests = require('../queueProcessors/predictionsRequest');

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, MAX_CONCURRENT_JOBS } = process.env;

const queueOptions = {
  redis: { 
    port: REDIS_PORT, 
    host: REDIS_HOST, 
    password: REDIS_PASSWORD 
  },
  limiter: {
    max: MAX_CONCURRENT_JOBS,
    duration: 5000,
  }
};

const predictionsQueue = new Bull('predictions-requests-queue', queueOptions);

predictionsQueue.process(processClassificationRequests);

module.exports = predictionsQueue;