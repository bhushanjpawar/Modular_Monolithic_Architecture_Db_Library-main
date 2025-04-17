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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.AddCommandHandler = exports.AddCommand = exports.AddResponseDTO = exports.AddRequestDTO = exports.Add = void 0;
require("reflect-metadata");
const neverthrow_1 = require("neverthrow");
const env_1 = require("./config/env");
const http_status_codes_1 = require("http-status-codes");
const typedi_1 = __importStar(require("typedi"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const results_1 = require("./shared/utils/exceptions/results");
const mediatr_ts_1 = require("mediatr-ts");
const loggers_1 = require("./shared/utils/helpers/loggers");
const index_1 = __importDefault(require("./shared/medaitR/index"));
const data_Response_1 = require("./shared/models/response/data.Response");
const dto_1 = require("./shared/utils/validations/dto");
let Add = class Add {
    add(a, b) {
        console.log(`env: ${process.env.NODE_ENV}`);
        console.log(`env: ${env_1.NODE_ENV}`);
        if (a <= 0 || b <= 0)
            return new neverthrow_1.Err(new results_1.ResultError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid input'));
        return new neverthrow_1.Ok(a + b);
    }
};
exports.Add = Add;
exports.Add = Add = __decorate([
    (0, typedi_1.Service)()
], Add);
class AddRequestDTO {
}
exports.AddRequestDTO = AddRequestDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AddRequestDTO.prototype, "a", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AddRequestDTO.prototype, "b", void 0);
class AddResponseDTO {
}
exports.AddResponseDTO = AddResponseDTO;
class AddCommand extends mediatr_ts_1.RequestData {
    constructor(addRequest) {
        super();
        this._addRequest = addRequest;
    }
    get addRequest() {
        return this._addRequest;
    }
}
exports.AddCommand = AddCommand;
let AddCommandHandler = class AddCommandHandler {
    constructor() {
        this._add = typedi_1.default.get(Add);
        this._dtoValidator = typedi_1.default.get((dto_1.DtoValidation));
    }
    async handle(value) {
        var _a, _b, _c;
        try {
            // Validate DTO.
            //var validateResult=await validateOrRejectAsync<AddRequestDTO>(value.addRequest);
            var validateResult = await this._dtoValidator.handleAsync({
                dto: value.addRequest,
                dtoClass: AddRequestDTO,
            });
            if (validateResult.isErr())
                return Promise.resolve(data_Response_1.DataResponseFactory.Response(false, validateResult.error.statusCode, null, validateResult.error.message));
            // Call Add Service
            var result = this._add.add((_b = (_a = value === null || value === void 0 ? void 0 : value.addRequest) === null || _a === void 0 ? void 0 : _a.a) !== null && _b !== void 0 ? _b : 0, (_c = value.addRequest.b) !== null && _c !== void 0 ? _c : 0);
            if (result.isErr())
                return Promise.resolve(data_Response_1.DataResponseFactory.Response(false, result.error.statusCode, null, result.error.message));
            return Promise.resolve(data_Response_1.DataResponseFactory.Response(true, http_status_codes_1.StatusCodes.OK, { result: result.value }));
        }
        catch (ex) {
            const error = ex;
            return Promise.resolve(data_Response_1.DataResponseFactory.Response(false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message));
        }
    }
};
exports.AddCommandHandler = AddCommandHandler;
exports.AddCommandHandler = AddCommandHandler = __decorate([
    (0, mediatr_ts_1.requestHandler)(AddCommand),
    __metadata("design:paramtypes", [])
], AddCommandHandler);
class Main {
    async addCall(a, b) {
        const addRequestDTO = new AddRequestDTO();
        addRequestDTO.a = a;
        addRequestDTO.b = b;
        loggers_1.logger.info('Hello');
        return await index_1.default.send(new AddCommand(addRequestDTO));
    }
}
exports.Main = Main;
