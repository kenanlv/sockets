"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const _redis = require("redis");
const config = require("../../../config");
class Redis {
    constructor() {
        this.client = _redis.createClient(config.REDIS.PORT, config.REDIS.HOST);
    }
}
exports.Redis = Redis;
//# sourceMappingURL=redis.js.map