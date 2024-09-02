"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Online = void 0;
const di_1 = require("./core/di/di");
class Online {
    static clear() {
        di_1.Di.get('data/redis').client.del("online");
    }
    static push(guid) {
        di_1.Di.get('data/redis').client.sadd("online", guid);
    }
    static pop(guid) {
        di_1.Di.get('data/redis').client.srem("online", guid, -1);
    }
}
exports.Online = Online;
Online.redis = di_1.Di.get('data/redis');
Online.cassandra = di_1.Di.get('data/cassandra');
//# sourceMappingURL=online.js.map