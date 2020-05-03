const endpoints = require('../endpoints');
const handlers = require('../handlers');

function setRouter(expressApp) {
  const endpointKeys = Reflect.ownKeys(endpoints);
  
  for (const endpointKey of endpointKeys) {
    const { handler, verb, middlewares } = endpoints[endpointKey];

    expressApp[verb](endpointKey, middlewares, handlers[handler]);
  }
}

module.exports = { setRouter };