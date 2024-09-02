"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binding = void 0;
class Binding {
    constructor() {
        this.factory = false;
        this.immutable = false;
    }
    setFactory(factory) {
        this.factory = factory;
        return this;
    }
    isFactory() {
        return this.factory;
    }
    setImmutable(immutable) {
        this.immutable = immutable;
        return this;
    }
    isImmutable() {
        return this.immutable;
    }
    setFunction(func) {
        this.func = func;
        return this;
    }
    getFunction() {
        return this.func;
    }
}
exports.Binding = Binding;
//# sourceMappingURL=binding.js.map