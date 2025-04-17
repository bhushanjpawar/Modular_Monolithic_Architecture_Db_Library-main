"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataResponseFactory = exports.DataResponse = exports.PaginationDataResponseModel = void 0;
class PaginationDataResponseModel {
}
exports.PaginationDataResponseModel = PaginationDataResponseModel;
class DataResponse {
}
exports.DataResponse = DataResponse;
class DataResponseFactory {
    static Response(success, statusCode, data, message, pagination) {
        return {
            Success: success,
            StatusCode: statusCode,
            Data: data,
            Message: message,
            Pagination: pagination,
        };
    }
    static success(statusCode, data, message, pagination) {
        return {
            Success: true,
            StatusCode: statusCode,
            Data: data,
            Message: message,
            Pagination: pagination,
        };
    }
    static error(statusCode, message, pagination) {
        return {
            Success: false,
            StatusCode: statusCode,
            Data: undefined,
            Message: message,
            Pagination: pagination,
        };
    }
}
exports.DataResponseFactory = DataResponseFactory;
