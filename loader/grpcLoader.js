const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const services = require('../protos/services.json');

const PROTO_PATH = path.join(__dirname, '../', 'protos');
const PROTOS = fs.readdirSync(PROTO_PATH, { encoding: 'utf-8' }).filter((value) => value.split('.').pop() === 'proto');
logger.info(`Protos found: ${PROTOS}`);

/**
 * This function returns a gRPC Object used to invoke gRPC services. The proto file must be defined and the corresponding variables too.
 * @param {string} serviceName - This variable should correspond to the property "name" in protos/services.json
 */
function getGrpcClientByServiceName(serviceName) {
  const foundService = services.find(item => (item.name === serviceName));
  if (!foundService) {
    logger.error(`Requested proto load ${serviceName} was not defined as a service, exiting process.`);
    process.exit(1);
  }

  const protoPath = path.join(PROTO_PATH, foundService.fileName);
  if (!fs.existsSync(protoPath)) {
    logger.error(`Requested proto load ${serviceName} does not exists, exiting process.`);
    process.exit(1);
  }

  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

  const servicePort = process.env[`${foundService.envPrefix}_PORT`];
  const serviceHost = process.env[`${foundService.envPrefix}_HOST`];

  if (!servicePort || !serviceHost) {
    logger.error(`Service ${serviceName} port or host were not defined in the environment variables, exiting the process.`);
    process.exit(1);
  }

  const grpcLoadedProto = grpc.loadPackageDefinition(packageDefinition);
  return new grpcLoadedProto[foundService.package][foundService.name](`${serviceHost}:${servicePort}`, grpc.credentials.createInsecure());
}

module.exports = getGrpcClientByServiceName;