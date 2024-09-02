"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.CASSANDRA = exports.REDIS = exports.TWILIO = exports.MULTI = exports.PORT = void 0;
const yargs_1 = require("yargs");
exports.PORT = yargs_1.argv['PORT'] || 8010;
exports.MULTI = yargs_1.argv['MULTI'] || false;
exports.TWILIO = {
    ID: '',
    SECRET: ''
};
exports.REDIS = {
    HOST: yargs_1.argv['REDIS-HOST'] || '127.0.0.1',
    PORT: yargs_1.argv['REDIS-PORT'] || 6379
};
exports.CASSANDRA = {
    SERVERS: yargs_1.argv['CASSANDRA-SERVERS'] ? [yargs_1.argv['CASSANDRA-SERVERS']] : ['127.0.0.1'],
    KEYSPACE: yargs_1.argv['CASSANDRA-KEYSPACE'] || 'minds'
};
exports.JWT_SECRET = yargs_1.argv['JWT-SECRET'];
//# sourceMappingURL=config.js.map