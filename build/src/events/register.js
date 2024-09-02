"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const di_1 = require("../core/di/di");
const helpers_1 = require("../helpers");
const bootstrap_1 = require("../bootstrap");
class Register {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.redis = di_1.Di.get('data/redis');
        this.listen();
    }
    listen() {
        this.socket.on('register', (guid, access_token) => {
            if (!guid) {
                console.log("[register][error]: guid not set (" + this.socket.id + ")");
                this.socket.emit('connect_error', 'Guid must be set..');
                return;
            }
            helpers_1.Helpers.getUserByAccessToken(access_token)
                .then((user_guid) => {
                if (user_guid != guid) {
                    return;
                }
                bootstrap_1.Bootstrap.register(this.socket, user_guid);
            });
        });
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map