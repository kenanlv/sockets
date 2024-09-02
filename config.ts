import { argv } from 'yargs';

export const PORT = argv['PORT'] || 8010;
console.log('PORT:', PORT);

export const MULTI = argv['MULTI'] || false;
console.log('MULTI:', MULTI);

export const TWILIO = {
  ID: '',
  SECRET: ''
};

export const REDIS = {
  HOST: argv['REDIS-HOST'] || '127.0.0.1',
  PORT: argv['REDIS-PORT'] || 6379
};
console.log('REDIS HOST:', REDIS.HOST);
console.log('REDIS PORT:', REDIS.PORT);

export const CASSANDRA = {
  SERVERS: argv['CASSANDRA-SERVERS'] ? [argv['CASSANDRA-SERVERS']] : ['127.0.0.1'],
  KEYSPACE: argv['CASSANDRA-KEYSPACE'] || 'minds'
};
console.log('CASSANDRA SERVERS:', CASSANDRA.SERVERS);
console.log('CASSANDRA KEYSPACE:', CASSANDRA.KEYSPACE);

export const JWT_SECRET = argv['JWT-SECRET'];
console.log('JWT_SECRET:', JWT_SECRET);
