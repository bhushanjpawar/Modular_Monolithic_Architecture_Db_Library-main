"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../../../../../shared/entity/base");
const tUserCommunication_1 = require("../tUserCommunication");
const tUserSettings_1 = require("../tUserSettings");
const class_validator_1 = require("class-validator");
const isSafeString_1 = require("../../../../../shared/utils/validations/decorators/isSafeString");
const tUserKeys_1 = require("../tUserKeys");
const tUserCredentials_1 = require("../tUserCredentials");
let UserEntity = class UserEntity extends base_1.BaseEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)(`varchar`, { length: 100, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, isSafeString_1.IsSafeString)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(`varchar`, { length: 100, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, isSafeString_1.IsSafeString)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(`varchar`, { length: 255, nullable: false }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserEntity.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUserCommunication_1.UserCommunicationEntity, (userCommunication) => userCommunication.users),
    __metadata("design:type", tUserCommunication_1.UserCommunicationEntity)
], UserEntity.prototype, "userCommunication", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUserKeys_1.UserKeysEntity, (userKeysEntity) => userKeysEntity.users),
    __metadata("design:type", tUserKeys_1.UserKeysEntity)
], UserEntity.prototype, "userKeys", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUserSettings_1.UserSettingsEntity, (userSettings) => userSettings.users),
    __metadata("design:type", tUserSettings_1.UserSettingsEntity)
], UserEntity.prototype, "userSetting", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUserCredentials_1.UserCredentialsEntity, (userCredentials) => userCredentials.users),
    __metadata("design:type", tUserCredentials_1.UserCredentialsEntity)
], UserEntity.prototype, "userCredentials", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: `user`, name: `users` })
], UserEntity);
