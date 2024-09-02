"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const helpers_1 = require("./helpers");
const online_1 = require("./online");
class Bootstrap {
    static register(socket, guid) {
        helpers_1.Helpers.setGuidForSocket(socket, guid);
        helpers_1.Helpers.setSocketForGuid(guid, socket);
        socket.emit('registered', guid);
        online_1.Online.push(guid);
    }
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map