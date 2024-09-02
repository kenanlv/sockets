"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Di = void 0;
const binding_1 = require("./binding");
class Di {
    static get(alias) {
        if (Di.bindings[alias]) {
            let binding = Di.bindings[alias];
            if (binding.isFactory()) {
                if (!Di.factories[alias])
                    Di.factories[alias] = binding.getFunction(Di)();
                return Di.factories[alias];
            }
            else {
                return binding.getFunction(Di)();
            }
        }
        return null;
    }
    static bind(alias, func, options) {
        options = Object.assign({
            factory: false,
            immutable: false
        }, options);
        let binding = new binding_1.Binding();
        binding.setFunction(func)
            .setFactory(options.factory)
            .setImmutable(options.immutable);
        Di.bindings[alias] = binding;
    }
}
exports.Di = Di;
Di.bindings = {};
Di.factories = {};
//# sourceMappingURL=di.js.map