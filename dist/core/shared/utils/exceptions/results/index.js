"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultExceptionFactory = exports.ResultError = void 0;
const neverthrow_1 = require("neverthrow");
class ResultError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ResultError = ResultError;
class ResultExceptionFactory {
    static error(statusCode, message) {
        return new neverthrow_1.Err(new ResultError(statusCode, message));
    }
    static errorInstance(resultError) {
        return new neverthrow_1.Err(resultError);
    }
}
exports.ResultExceptionFactory = ResultExceptionFactory;
