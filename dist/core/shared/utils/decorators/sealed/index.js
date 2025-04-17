"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sealed = sealed;
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
