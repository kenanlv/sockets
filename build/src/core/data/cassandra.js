"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cassandra = void 0;
const _cassandra = require("cassandra-driver");
const config = require("../../../config");
class Cassandra {
    constructor() {
        this.client = new _cassandra.Client({
            contactPoints: config.CASSANDRA.SERVERS,
            keyspace: config.CASSANDRA.KEYSPACE
        });
    }
}
exports.Cassandra = Cassandra;
//# sourceMappingURL=cassandra.js.map