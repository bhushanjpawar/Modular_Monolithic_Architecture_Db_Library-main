"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBITMQ_URL = exports.REDIS_USERNAME = exports.REDIS_DB = exports.REDIS_PASSWORD = exports.REDIS_PORT = exports.REDIS_HOST = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.IS_PROD = exports.IS_TEST = exports.IS_DEV = exports.NODE_ENV = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.IS_DEV = exports.NODE_ENV === 'development';
exports.IS_TEST = exports.NODE_ENV === 'test';
exports.IS_PROD = exports.NODE_ENV === 'production';
_a = process.env, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_USERNAME = _a.DB_USERNAME, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_DATABASE = _a.DB_DATABASE, exports.REDIS_HOST = _a.REDIS_HOST, exports.REDIS_PORT = _a.REDIS_PORT, exports.REDIS_PASSWORD = _a.REDIS_PASSWORD, exports.REDIS_DB = _a.REDIS_DB, exports.REDIS_USERNAME = _a.REDIS_USERNAME, exports.RABBITMQ_URL = _a.RABBITMQ_URL;
