const { v4: uuidv4 } = require('uuid');
const { addSessionData } = require('../helpers/sessionData');
const PredictionsQueue = require('../loader/bullLoader');

module.exports = {
  /**
   * This endpoint is in charge of receiving the input to classify and delegate the operations
   * to the other services or to put the request in the queue in case the server is loaded.
   * @param {Object} request - The Express request handler. Has an embedded logger.
   * @param {Object} response - The Express response handler.
   */
  async predict(request, response) {
    const sessionId = uuidv4();

    addSessionData(request, response, sessionId);

    PredictionsQueue.add({ sessionId });
  }
};