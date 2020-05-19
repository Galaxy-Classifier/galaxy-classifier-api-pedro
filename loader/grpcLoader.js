/**
 * This file is in charge of:
 * - Creating the gRPC client.
 * - Loading the gRPC services.
 * 
 * Returns the gRPC client.
 */

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');
const clients = require('../protos/clients');

function getProtos(logger) {
  const protoPath = path.join(__dirname, '../', 'protos');
  const protos = fs.readdirSync(protoPath, { encoding: 'utf-8' }).filter((value) => value.split('.').pop() === 'proto');

  logger.info(`Protos found: ${protos}`);

  return protos.map((proto) => path.join(protoPath, proto));
}

module.exports = {
  createGrpcClients(logger) {
    const protos = getProtos(logger);

    const grpcClients = {};
    for (const client of clients) {
      const proto = protos.find(element => (element.includes(client.fileName)));
      const packageDefinition = protoLoader.loadSync(proto, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
      const grpcLoadedProto = grpc.loadPackageDefinition(packageDefinition);

      const servicePort = process.env[`${client.envPrefix}_PORT`];
      const serviceHost = process.env[`${client.envPrefix}_HOST`];
      logger.info(`Creating proto client: ${client.name}`);

      grpcClients[client.name] = new grpcLoadedProto[client.package][client.name](`${serviceHost}:${servicePort}`, grpc.credentials.createInsecure());
    }

    return grpcClients;
  },
};
