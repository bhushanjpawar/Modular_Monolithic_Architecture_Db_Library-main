"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFireAndForget = exports.JobPromise = void 0;
const loggers_1 = require("../../helpers/loggers");
const JobPromise = (callBack) => {
    Promise.resolve(callBack()).catch((error) => {
        loggers_1.logger.error(`Error in fire and forget job: ${error}`);
    });
};
exports.JobPromise = JobPromise;
const JobFireAndForget = (callBack) => {
    setImmediate(callBack);
};
exports.JobFireAndForget = JobFireAndForget;
