"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesDecryptWrapper = exports.AesEncryptWrapper = exports.AES = void 0;
const crypto_1 = __importDefault(require("crypto"));
const typedi_1 = require("typedi");
const neverthrow_1 = require("neverthrow");
const results_1 = require("../../exceptions/results");
const constant_1 = require("../../../models/constant");
const http_status_codes_1 = require("http-status-codes");
class AES {
    constructor(encryptionKey) {
        this._ivLength = constant_1.ivLength;
        this._encryptionKey = encryptionKey;
    }
    encryptAsync(data) {
        return new Promise((resolve, reject) => {
            try {
                let iv = crypto_1.default.randomBytes(this._ivLength);
                let cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(this._encryptionKey), iv);
                let encrypted = cipher.update(data);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                return resolve(`${iv.toString('hex')}:${encrypted.toString('hex')}`);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    decryptAsync(data) {
        return new Promise((resolve, reject) => {
            try {
                let textParts = data.split(':');
                let iv = Buffer.from(textParts.shift(), 'hex');
                let encryptedText = Buffer.from(textParts.join(':'), 'hex');
                let decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(this._encryptionKey), iv);
                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                return resolve(decrypted.toString());
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.AES = AES;
let AesEncryptWrapper = class AesEncryptWrapper {
    async handleAsync(params) {
        try {
            if (!params)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'parameter is null'));
            if (!params.data)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'data is null'));
            if (!params.key)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'key is null'));
            const aes = new AES(params.key);
            const body = JSON.stringify(params.data);
            if (!body)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'body is null'));
            const encryptedBody = await aes.encryptAsync(body);
            if (!encryptedBody)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'encryptedBody is null'));
            return new neverthrow_1.Ok(encryptedBody);
        }
        catch (ex) {
            const error = ex;
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
        }
    }
};
exports.AesEncryptWrapper = AesEncryptWrapper;
exports.AesEncryptWrapper = AesEncryptWrapper = __decorate([
    (0, typedi_1.Service)()
], AesEncryptWrapper);
let AesDecryptWrapper = class AesDecryptWrapper {
    async handleAsync(params) {
        try {
            if (!params)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'parameter is null'));
            if (!params.data)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'data is null'));
            if (!params.key)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'key is null'));
            const aes = new AES(params.key);
            const decryptedBody = await aes.decryptAsync(params.data);
            if (!decryptedBody)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'decryptedBody is null'));
            const body = JSON.parse(decryptedBody);
            if (!body)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'body is null'));
            return new neverthrow_1.Ok(body);
        }
        catch (ex) {
            const error = ex;
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
        }
    }
};
exports.AesDecryptWrapper = AesDecryptWrapper;
exports.AesDecryptWrapper = AesDecryptWrapper = __decorate([
    (0, typedi_1.Service)()
], AesDecryptWrapper);
