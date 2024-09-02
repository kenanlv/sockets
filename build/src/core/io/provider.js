"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IO_PROVIDER = void 0;
const di_1 = require("../di/di");
const io_1 = require("./io");
const IO_PROVIDER = function () {
    di_1.Di.bind('io', () => {
        return new io_1.IO();
    }, { factory: true });
};
exports.IO_PROVIDER = IO_PROVIDER;
//# sourceMappingURL=provider.js.map