"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
const async = require("async");
const di_1 = require("../core/di/di");
const helpers_1 = require("../helpers");
class SendMessage {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.redis = di_1.Di.get('data/redis');
        this.cassandra = di_1.Di.get('data/cassandra');
        this.listen();
    }
    listen() {
        this.socket.on('sendMessage', (guid, message) => {
            async.parallel([
                (cb) => helpers_1.Helpers.getGuidFromSocket(this.socket).then(from => cb(null, from)).catch(err => cb(err, null)),
                (cb) => helpers_1.Helpers.getSocketsFromGuid(guid).then(tos => cb(null, tos)).catch(err => cb(err, null))
            ], (err, res) => {
                this.send(res[0], res[1], message);
            });
        });
    }
    send(from_guid, to_sockets, message) {
        for (let to of to_sockets) {
            this.io.to(to).emit('messageReceived', from_guid, message);
        }
    }
}
exports.SendMessage = SendMessage;
//# sourceMappingURL=message.js.map