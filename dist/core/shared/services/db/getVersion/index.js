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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByVersionIdentifierService = void 0;
const neverthrow_1 = require("neverthrow");
const results_1 = require("../../../utils/exceptions/results");
const typedi_1 = __importStar(require("typedi"));
const dto_1 = require("../../../utils/validations/dto");
const dbSource_1 = require("../../../../config/dbSource");
const http_status_codes_1 = require("http-status-codes");
let GetByVersionIdentifierService = class GetByVersionIdentifierService {
    constructor(entity) {
        this.entity = entity;
        this.dtoValidation = typedi_1.default.get((dto_1.DtoValidation));
    }
    async handleAsync(params, queryRunner) {
        let response = null;
        try {
            if ('identifier' in params === false)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Identifier is required'));
            if ('status' in params === false)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Status is required'));
            // Validate Entity
            const validationResult = await this.dtoValidation.handleAsync({
                dto: params,
                dtoClass: params.constructor,
            });
            if (validationResult.isErr())
                return new neverthrow_1.Err(validationResult.error);
            // Run Query Runner
            const entityManager = queryRunner ? queryRunner.manager : dbSource_1.dbDataSource.manager;
            // Get Entity
            const result = await entityManager
                .createQueryBuilder(this.entity, 'entity')
                .select(['entity.identifier', 'entity.version'])
                .where('entity.identifier = :identifier', {
                identifier: params.identifier,
            })
                .andWhere('entity.status = :status', {
                status: params.status,
            })
                .getOne();
            // Check if get is successfully
            if (!result)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.NOT_FOUND, 'entity not found'));
            const entity = result;
            if ('identifier' in entity && 'version' in entity) {
                response = {
                    identifier: entity.identifier,
                    version: entity.version,
                };
            }
            if (!response)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Version row not found'));
            // Return response
            return new neverthrow_1.Ok(response);
        }
        catch (ex) {
            const error = ex;
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
        }
    }
};
exports.GetByVersionIdentifierService = GetByVersionIdentifierService;
exports.GetByVersionIdentifierService = GetByVersionIdentifierService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Function])
], GetByVersionIdentifierService);
