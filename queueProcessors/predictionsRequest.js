const resizePictures = require('../grpcHandlers/valentina');
const { getSessionData, removeSessionData } = require('../helpers/sessionData');

async function processClassificationRequests({ data: { sessionId } }) {
  const { request, response } = getSessionData(sessionId);

  const { files } = request;

  const imageRequest = [];
  for (const file of files) {
    imageRequest.push({ id: file.originalname, chunk_data: file.buffer })
  }

  const data = await resizePictures(imageRequest, request.ctx.logger);
  if (data.error) {
    removeSessionData(sessionId);
    return response.status(503).json({ message: 'Our servers could not respond.' });
  }
  
  removeSessionData(sessionId);
  return response.status(201).send({ works: true });
}

module.exports = processClassificationRequests;