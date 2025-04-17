"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoValidation = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const neverthrow_1 = require("neverthrow");
const class_transformer_1 = require("class-transformer");
const typedi_1 = require("typedi");
const results_1 = require("../../exceptions/results");
async function validateOrRejectAsync(input, dtoClass) {
    try {
        // Convert plain object to class instance
        const instance = (0, class_transformer_1.plainToInstance)(dtoClass, input);
        // Validate the instance
        await (0, class_validator_1.validateOrReject)(instance, { skipMissingProperties: true });
        return new neverthrow_1.Ok('ok');
    }
    catch (errors) {
        const errorsArray = errors;
        const message = errorsArray
            .map((error) => Object.values(error.constraints).join(', '))
            .join(', ');
        return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, message));
    }
}
let DtoValidation = class DtoValidation {
    async handleAsync(params) {
        try {
            if (!params)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'parameter is null'));
            if (!params.dto)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'dto is null'));
            if (!params.dtoClass)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'dtoClass is null'));
            return await validateOrRejectAsync(params.dto, params.dtoClass);
        }
        catch (ex) {
            const error = ex;
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
        }
    }
};
exports.DtoValidation = DtoValidation;
exports.DtoValidation = DtoValidation = __decorate([
    (0, typedi_1.Service)()
], DtoValidation);
