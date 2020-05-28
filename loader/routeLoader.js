const endpoints = require('../endpoints');
const handlers = require('../handlers');

function setRouter(expressApp, logger) {
  const endpointKeys = Reflect.ownKeys(endpoints);
  
  const embedLogger = (req, res, next) => {
    req.ctx = { logger };
    return next();
  };
  
  for (const endpointKey of endpointKeys) {
    const { handler, verb, middlewares } = endpoints[endpointKey];

    logger.info(`Loading endpoint: ${verb} ${endpointKey}`);

    expressApp[verb](endpointKey, [embedLogger, ...middlewares], handlers[handler]);
  }
}

module.exports = { setRouter };