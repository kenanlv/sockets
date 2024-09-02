"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const di_1 = require("./core/di/di");
class Helpers {
    static getGuidFromSocket(socket) {
        let redis = di_1.Di.get('data/redis');
        return new Promise((resolve, reject) => {
            redis.client.get(`sockets:socket:${socket.id}`, (err, response) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(response);
            });
        });
    }
    static setGuidForSocket(socket, guid) {
        console.log(`[redis][debug]: ${socket}:${guid}`);
        let redis = di_1.Di.get('data/redis');
        redis.client.set(`sockets:socket:${socket.id}`, guid);
    }
    static getSocketsFromGuid(guid) {
        let redis = di_1.Di.get('data/redis');
        return new Promise((resolve, reject) => {
            redis.client.lrange(`sockets:guid:${guid}`, 0, -1, (err, response) => {
                if (err) {
                    console.log(`[redis][error]: ${err}`);
                    reject(err);
                    return false;
                }
                resolve(response);
            });
        });
    }
    static setSocketForGuid(guid, socket) {
        let redis = di_1.Di.get('data/redis');
        redis.client.rpush(`sockets:guid:${guid}`, socket.id);
    }
    static getUserByAccessToken(token) {
        let cassandra = di_1.Di.get('data/cassandra');
        return new Promise((resolve, reject) => {
            cassandra.client.execute("SELECT * FROM entities WHERE key=?", [token], { prepare: true }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!result.rows || result.rows.length == 0) {
                    reject();
                    return;
                }
                let user_guid;
                let data = result.rows.reduce((carry, row) => {
                    carry[row.column1] = row.value;
                    return carry;
                }, {});
                if (data.expires) {
                    let expires = parseInt(data.expires, 10), now = Date.now() / 1000;
                    if (expires <= now) {
                        reject('Expired access token');
                    }
                }
                user_guid = data.user_id;
                resolve(user_guid);
            });
        });
    }
    static getSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let redis = di_1.Di.get('data/redis');
            try {
                let cached = yield new Promise((resolve, reject) => {
                    redis.client.get(id, (err, response) => {
                        if (err) {
                            reject(err);
                            return false;
                        }
                        resolve(response);
                    });
                });
                if (cached)
                    return cached;
            }
            catch (err) { }
            let cassandra = di_1.Di.get('data/cassandra');
            return new Promise((resolve, reject) => {
                cassandra.client.execute("SELECT * FROM session WHERE key=?", [id], { prepare: true }, (err, result) => {
                    if (err)
                        return reject(true);
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result.rows[i].column1 = 'data')
                            return resolve(result.rows[i].value);
                    }
                    reject(true);
                });
            });
        });
    }
    static parseRoomName(roomName) {
        let data = {
            type: 'generic',
            guids: []
        };
        if (!roomName || roomName.indexOf(':') === -1) {
            return data;
        }
        let room = roomName.split(':'), type = room.splice(0, 1);
        data.type = type[0];
        data.guids = room;
        return data;
    }
}
exports.Helpers = Helpers;
Helpers.redis = di_1.Di.get('data/redis');
Helpers.cassandra = di_1.Di.get('data/cassandra');
//# sourceMappingURL=helpers.js.map