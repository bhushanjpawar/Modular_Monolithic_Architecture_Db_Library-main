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
exports.AddUserCredentialsService = exports.AddUserSettingsService = exports.AddUserKeyService = exports.AddUserCommunicationService = exports.AddUserService = void 0;
const typedi_1 = __importStar(require("typedi"));
const add_1 = require("../../../../../../shared/services/db/add");
const tUsers_1 = require("../../../../infrastructures/entity/tUsers");
const tUserCommunication_1 = require("../../../../infrastructures/entity/tUserCommunication");
const tUserKeys_1 = require("../../../../infrastructures/entity/tUserKeys");
const tUserSettings_1 = require("../../../../infrastructures/entity/tUserSettings");
const tUserCredentials_1 = require("../../../../infrastructures/entity/tUserCredentials");
typedi_1.default.set((add_1.AddService), new add_1.AddService(tUsers_1.UserEntity));
typedi_1.default.set((add_1.AddService), new add_1.AddService(tUserCommunication_1.UserCommunicationEntity));
typedi_1.default.set((add_1.AddService), new add_1.AddService(tUserKeys_1.UserKeysEntity));
typedi_1.default.set((add_1.AddService), new add_1.AddService(tUserSettings_1.UserSettingsEntity));
typedi_1.default.set((add_1.AddService), new add_1.AddService(tUserCredentials_1.UserCredentialsEntity));
let AddUserService = class AddUserService extends add_1.AddService {
    constructor() {
        super(tUsers_1.UserEntity);
    }
};
exports.AddUserService = AddUserService;
exports.AddUserService = AddUserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AddUserService);
let AddUserCommunicationService = class AddUserCommunicationService extends add_1.AddService {
    constructor() {
        super(tUserCommunication_1.UserCommunicationEntity);
    }
};
exports.AddUserCommunicationService = AddUserCommunicationService;
exports.AddUserCommunicationService = AddUserCommunicationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AddUserCommunicationService);
let AddUserKeyService = class AddUserKeyService extends add_1.AddService {
    constructor() {
        super(tUserKeys_1.UserKeysEntity);
    }
};
exports.AddUserKeyService = AddUserKeyService;
exports.AddUserKeyService = AddUserKeyService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AddUserKeyService);
let AddUserSettingsService = class AddUserSettingsService extends add_1.AddService {
    constructor() {
        super(tUserSettings_1.UserSettingsEntity);
    }
};
exports.AddUserSettingsService = AddUserSettingsService;
exports.AddUserSettingsService = AddUserSettingsService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AddUserSettingsService);
let AddUserCredentialsService = class AddUserCredentialsService extends add_1.AddService {
    constructor() {
        super(tUserCredentials_1.UserCredentialsEntity);
    }
};
exports.AddUserCredentialsService = AddUserCredentialsService;
exports.AddUserCredentialsService = AddUserCredentialsService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AddUserCredentialsService);
