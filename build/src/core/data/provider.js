"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_PROVIDER = void 0;
const di_1 = require("../di/di");
const redis_1 = require("./redis");
const cassandra_1 = require("./cassandra");
const DATA_PROVIDER = function () {
    di_1.Di.bind('data/redis', () => {
        return new redis_1.Redis();
    }, { factory: true });
    di_1.Di.bind('data/cassandra', () => {
        return new cassandra_1.Cassandra();
    }, { factory: true });
};
exports.DATA_PROVIDER = DATA_PROVIDER;
//# sourceMappingURL=provider.js.map