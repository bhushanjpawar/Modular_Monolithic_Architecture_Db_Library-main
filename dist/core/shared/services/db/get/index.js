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
exports.GetService = void 0;
const neverthrow_1 = require("neverthrow");
const pageList_1 = require("../../../utils/miscellaneous/pageList");
const results_1 = require("../../../utils/exceptions/results");
const dto_1 = require("../../../utils/validations/dto");
const dbSource_1 = require("../../../../config/dbSource");
const typedi_1 = __importStar(require("typedi"));
const http_status_codes_1 = require("http-status-codes");
const order_1 = require("../../../models/types/order");
let GetService = class GetService {
    constructor(entity) {
        this.entity = entity;
        this.dtoValidation = typedi_1.default.get((dto_1.DtoValidation));
    }
    async handleAsync(params, pagination, 
    //addWhereClauses?: ((queryBuilder: SelectQueryBuilder<T>) => void) | null,
    sort, queryRunner) {
        try {
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
            // Create Query Builder
            let queryBuilder = entityManager
                .createQueryBuilder(this.entity, 'entity')
                .where('entity.status = :status', {
                status: params.status,
            });
            // Add dynamic where clauses via callback
            // if (addWhereClauses) {
            // 	addWhereClauses(queryBuilder);
            // }
            // Apply sorting
            if (sort && sort.by.length > 0) {
                sort.by.forEach((column) => {
                    queryBuilder = queryBuilder.addOrderBy(`entity.${column}`, sort.direction === order_1.Order.ASC ? 'ASC' : 'DESC');
                });
            }
            // Get Paged List
            let pagedList;
            if (pagination) {
                pagedList = await pageList_1.PagedList.toPagedListAsync(queryBuilder, pagination.pageNumber, pagination.pageSize);
            }
            else {
                const allResults = await queryBuilder.getMany();
                pagedList = new pageList_1.PagedList(queryBuilder, allResults.length, 1, allResults.length);
            }
            // Return Paged List
            return new neverthrow_1.Ok(pagedList);
        }
        catch (ex) {
            const error = ex;
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
        }
    }
};
exports.GetService = GetService;
exports.GetService = GetService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Function])
], GetService);
