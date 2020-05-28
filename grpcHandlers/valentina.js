const getGrpcClientByServiceName = require('../loader/grpcLoader');

const ValentinaGrpcClient = getGrpcClientByServiceName('Valentina');

/**
 * Executes a gRPC request to resize an array of images.
 * @param {Object[]} imageRequest - The array of images to resize, comes from the executor.
 * @param {string} imageRequest[].id - The identifier of the image.
 * @param {Object} imageRequest[].chunk_data - A Buffer representation of the image.
 * @param {Object} logger - The application logger, comes from the executor REST request.
 */
async function resizePictures(imageRequest, logger) {
  return new Promise((resolve, reject) => {
    ValentinaGrpcClient.Resize({ imageRequest }, (error, info) => {
      if (error) {
        logger.error(`Valentina could not transform the input, due to the following error: ${error}`);
        reject({ error: true });
      }
  
      resolve(info);
    });
  });
}

module.exports = resizePictures;