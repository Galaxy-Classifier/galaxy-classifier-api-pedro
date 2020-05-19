const endpoints = require('../endpoints');
const handlers = require('../handlers');
const { createGrpcClients } = require('./grpcLoader');

function setRouter(expressApp, logger) {
  const endpointKeys = Reflect.ownKeys(endpoints);
  const grpcClients = createGrpcClients(logger);

  const addGrpcClients = (req, res, next) => {
    req.grpcClients = grpcClients;
    return next();
  };
  
  for (const endpointKey of endpointKeys) {
    const { handler, verb, middlewares } = endpoints[endpointKey];

    logger.info(`Loading endpoint: ${verb} ${endpointKey}`);

    expressApp[verb](endpointKey, [addGrpcClients, ...middlewares], handlers[handler]);
  }
}

module.exports = { setRouter };