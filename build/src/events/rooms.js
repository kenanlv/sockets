"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const di_1 = require("../core/di/di");
const helpers_1 = require("../helpers");
class Rooms {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.redis = di_1.Di.get('data/redis');
        this.cassandra = di_1.Di.get('data/cassandra');
        this.listen();
        this.socket.join(this.socket.id, () => {
            this.socket.emit('rooms', this.getRooms());
        });
    }
    listen() {
        this.socket.on('join', (rooms) => {
            if (!rooms) {
                return;
            }
            if (typeof rooms === 'string') {
                rooms = [rooms];
            }
            if (!rooms.length) {
                return;
            }
            helpers_1.Helpers.getGuidFromSocket(this.socket)
                .then((guid) => {
                rooms.forEach((room) => {
                    if (!this.allowed(guid, room)) {
                        this.socket.emit('joinError', room, 'NOT_ALLOWED');
                        return;
                    }
                    try {
                        this.socket.join(room, (e) => {
                            if (!e) {
                                this.socket.emit('joined', room, this.getRooms());
                            }
                            else {
                                this.socket.emit('joinError', room, e);
                            }
                        });
                    }
                    catch (e) {
                        this.socket.emit('joinError', room, e);
                    }
                });
            })
                .catch(e => {
                rooms.forEach((room) => {
                    this.socket.emit('joinError', room, e);
                });
            });
        });
        this.socket.on('leave', (rooms) => {
            if (!rooms) {
                return;
            }
            if (typeof rooms === 'string') {
                rooms = [rooms];
            }
            if (!rooms.length) {
                return;
            }
            rooms.forEach((room) => {
                try {
                    this.socket.leave(room, (e) => {
                        if (!e) {
                            this.socket.emit('left', room, this.getRooms());
                        }
                        else {
                            this.socket.emit('leaveError', room, e);
                        }
                    });
                }
                catch (e) {
                    this.socket.emit('leaveError', room, e);
                }
            });
        });
    }
    getRooms() {
        let rooms = Object.keys(this.socket.rooms), ownRoomIndex = rooms.indexOf(this.socket.id);
        if (ownRoomIndex > -1) {
            rooms.splice(ownRoomIndex, 1);
        }
        return rooms;
    }
    allowed(guid, roomName) {
        let room = helpers_1.Helpers.parseRoomName(roomName), allowed = true;
        switch (room.type) {
            case 'live':
                allowed = room.guids.indexOf(guid) === 0;
                break;
            case 'conversation':
                allowed = room.guids.indexOf(guid) > -1;
                break;
        }
        return allowed;
    }
}
exports.Rooms = Rooms;
//# sourceMappingURL=rooms.js.map