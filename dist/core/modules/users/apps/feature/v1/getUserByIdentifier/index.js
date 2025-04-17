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
exports.GetUsersByIdentifierService = void 0;
const typedi_1 = __importStar(require("typedi"));
const tUsers_1 = require("../../../../infrastructures/entity/tUsers");
const sealed_1 = require("../../../../../../shared/utils/decorators/sealed");
const neverthrow_1 = require("neverthrow");
const results_1 = require("../../../../../../shared/utils/exceptions/results");
const http_status_codes_1 = require("http-status-codes");
const dto_1 = require("../../../../../../shared/utils/validations/dto");
const dbSource_1 = require("../../../../../../config/dbSource");
let GetUsersByIdentifierService = class GetUsersByIdentifierService {
    constructor() {
        this.dtoValidation = typedi_1.default.get((dto_1.DtoValidation));
    }
    async handleAsync(params) {
        try {
            if ('identifier' in params.userEntity === false)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Identifier is required'));
            if ('status' in params.userEntity === false)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Status is required'));
            // Validate Entity
            const validationResult = await this.dtoValidation.handleAsync({
                dto: params.userEntity,
                dtoClass: params.userEntity.constructor,
            });
            if (validationResult.isErr())
                return new neverthrow_1.Err(validationResult.error);
            // Run Query Runner
            const entityManager = params.queryRunner
                ? params.queryRunner.manager
                : dbSource_1.dbDataSource.manager;
            // Get Entity
            const result = await entityManager
                .createQueryBuilder(tUsers_1.UserEntity, 'user')
                .innerJoinAndSelect('user.userCommunication', 'userCommunication')
                .innerJoinAndSelect('user.userKeys', 'userKeys')
                .innerJoinAndSelect('user.userSetting', 'userSetting')
                .innerJoinAndSelect('user.userCredentials', 'userCredentials')
                .where('user.identifier = :identifier', {
                identifier: params.userEntity.identifier,
            })
                .andWhere('user.status = :status', {
                status: params.userEntity.status,
            })
                .getOne();
            // Check if get is successfully
            if (!result)
                return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.NOT_FOUND, 'entity not found'));
            // Get Entity
            return new neverthrow_1.Ok(result);
        }
        catch (ex) {
            const error = ex;
            return results_1.ResultExceptionFactory.error(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
exports.GetUsersByIdentifierService = GetUsersByIdentifierService;
exports.GetUsersByIdentifierService = GetUsersByIdentifierService = __decorate([
    sealed_1.sealed,
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], GetUsersByIdentifierService);
