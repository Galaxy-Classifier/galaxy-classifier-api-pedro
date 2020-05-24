const resizePictures = require('../grpcHandlers/valentina');

module.exports = {
  /**
   * This endpoint is in charge of receiving the input to classify and delegate the operations
   * to the other services or to put the request in the queue in case the server is loaded.
   * @param {Object} request - The Express request handler. Has an embedded logger.
   * @param {Object} response - The Express response handler.
   */
  async predict(request, response) {
    const { files } = request;

    const imageRequest = [];
    for (const file of files) {
      imageRequest.push({ id: file.originalname, chunk_data: file.buffer })
    }

    const data = await resizePictures(imageRequest, request.ctx.logger);
    if (data.error) {
      return response.status(503).json({ message: 'Our servers could not respond.' });
    }

    return response.status(200).json({ data });
  }
};