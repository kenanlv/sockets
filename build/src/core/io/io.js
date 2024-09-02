"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IO = void 0;
const express = require("express");
const socketio = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const helpers_1 = require("../../helpers");
const bootstrap_1 = require("../../bootstrap");
class IO {
    constructor() {
        this.app = express();
        this.server = this.app.listen(config.PORT);
        this.io = socketio.listen(this.server, { pingTimeout: 30000 });
        this.app.get('/', function (req, res) {
            res.sendStatus(200);
        });
        this.io.use((socket, next) => {
            if (!socket.request.headers.cookie) {
                return next();
            }
            let c = cookie.parse(socket.request.headers.cookie);
            let token = c['socket_jwt'] || c['socket_jwt_multi'];
            if (!token) {
                return next();
            }
            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('[jwt]: token not found');
                    return next();
                }
                let guid = decoded.guid;
                let sessionId = decoded.sessionId;
                helpers_1.Helpers.getSession(sessionId)
                    .then((base64) => {
                    let session;
                    try {
                        session = atob(base64);
                    }
                    catch (err) {
                        session = base64;
                    }
                    if (session.indexOf(guid) > -1) {
                        bootstrap_1.Bootstrap.register(socket, guid);
                        console.log(`[jwt]: ${guid} just joined`);
                        next();
                    }
                    else {
                        console.log('[jwt]: session not found for ' + guid + ' ' + sessionId);
                        return next();
                    }
                })
                    .catch(() => {
                    console.log('[jwt]: no session found');
                    next();
                });
            });
        });
    }
}
exports.IO = IO;
//# sourceMappingURL=io.js.map