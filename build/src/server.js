"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindsSocketServer = void 0;
const _redis = require("redis");
const _ioRedis = require("socket.io-redis");
const config = require("../config");
const register_1 = require("./events/register");
const message_1 = require("./events/message");
const rooms_1 = require("./events/rooms");
const helpers_1 = require("./helpers");
const online_1 = require("./online");
const di_1 = require("./core/di/di");
const provider_1 = require("./core/io/provider");
const provider_2 = require("./core/data/provider");
class MindsSocketServer {
    constructor() {
    }
    init() {
        this.initBindings();
        this.initIOAdapter();
        this.listen();
    }
    initIOAdapter() {
        console.log('[init]: connecting to redis adapter');
        this.io.adapter(_ioRedis({
            pubClient: _redis.createClient(config.REDIS.PORT, config.REDIS.HOST),
            subClient: _redis.createClient(config.REDIS.PORT, config.REDIS.HOST, { detect_buffers: true })
        }));
    }
    initBindings() {
        (0, provider_1.IO_PROVIDER)();
        (0, provider_2.DATA_PROVIDER)();
        this.io = di_1.Di.get('io').io;
    }
    listen() {
        console.log('[listen]: Started listening on port %s', config.PORT);
        online_1.Online.clear();
        this.io.on('connection', (socket) => {
            console.log('[connection]: received');
            let register = new register_1.Register(socket, this.io);
            let message = new message_1.SendMessage(socket, this.io);
            let rooms = new rooms_1.Rooms(socket, this.io);
            socket.on('disconnect', () => {
                helpers_1.Helpers.getGuidFromSocket(socket)
                    .then((guid) => online_1.Online.pop(guid));
            });
        });
    }
}
exports.MindsSocketServer = MindsSocketServer;
new MindsSocketServer();
//# sourceMappingURL=server.js.map