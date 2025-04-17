"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHelper = void 0;
const axios_1 = __importDefault(require("axios"));
const neverthrow_1 = require("neverthrow");
const results_1 = require("../../exceptions/results");
const http_status_codes_1 = require("http-status-codes");
class AxiosHelper {
    constructor(config) {
        var _a, _b;
        this.axiosInstance = axios_1.default.create({
            baseURL: config.baseURL,
        });
        this.apiKey = (_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a.apiKey;
        this.token = (_b = config === null || config === void 0 ? void 0 : config.headers) === null || _b === void 0 ? void 0 : _b.token;
        this.axiosInstance.interceptors.request.use((config) => {
            if (this.apiKey) {
                config.headers['x-api-key'] = this.apiKey;
            }
            if (this.token) {
                config.headers['Authorization'] = `Bearer ${this.token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }
    async getAsync(endpoint, config) {
        var _a, _b;
        try {
            const response = await this.axiosInstance.get(endpoint, config);
            return new neverthrow_1.Ok(response.data);
        }
        catch (ex) {
            if (axios_1.default.isAxiosError(ex)) {
                const axiosError = ex;
                return new neverthrow_1.Err(new results_1.ResultError((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500, axiosError.message || ex.message));
            }
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
        }
    }
    async postAsync(endPoint, data, config) {
        var _a, _b;
        try {
            const response = await this.axiosInstance.post(endPoint, data, config);
            return new neverthrow_1.Ok(response.data);
        }
        catch (ex) {
            if (axios_1.default.isAxiosError(ex)) {
                const axiosError = ex;
                return new neverthrow_1.Err(new results_1.ResultError((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500, axiosError.message || ex.message));
            }
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
        }
    }
    async putAsync(endPoint, data, config) {
        var _a, _b;
        try {
            const response = await this.axiosInstance.put(endPoint, data, config);
            return new neverthrow_1.Ok(response.data);
        }
        catch (ex) {
            if (axios_1.default.isAxiosError(ex)) {
                const axiosError = ex;
                return new neverthrow_1.Err(new results_1.ResultError((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500, axiosError.message || ex.message));
            }
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
        }
    }
    async deleteAsync(endPoint, config) {
        var _a, _b;
        try {
            const response = await this.axiosInstance.delete(endPoint, config);
            return new neverthrow_1.Ok(response.data);
        }
        catch (ex) {
            if (axios_1.default.isAxiosError(ex)) {
                const axiosError = ex;
                return new neverthrow_1.Err(new results_1.ResultError((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500, axiosError.message || ex.message));
            }
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
        }
    }
    async patchAsync(endPoint, data, config) {
        var _a, _b;
        try {
            const response = await this.axiosInstance.patch(endPoint, data, config);
            return new neverthrow_1.Ok(response.data);
        }
        catch (ex) {
            if (axios_1.default.isAxiosError(ex)) {
                const axiosError = ex;
                return new neverthrow_1.Err(new results_1.ResultError((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 500, axiosError.message || ex.message));
            }
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
        }
    }
}
exports.AxiosHelper = AxiosHelper;
