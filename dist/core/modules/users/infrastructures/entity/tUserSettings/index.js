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
exports.UserSettingsEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../../../../../shared/entity/base");
const tUsers_1 = require("../tUsers");
const class_validator_1 = require("class-validator");
const bool_enum_1 = require("../../../../../shared/models/enums/bool.enum");
let UserSettingsEntity = class UserSettingsEntity extends base_1.BaseEntity {
};
exports.UserSettingsEntity = UserSettingsEntity;
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    (0, class_validator_1.ValidateIf)((o) => o.emailVerificationToken !== null && o.emailVerificationToken !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'emailVerification token must be a non-empty string' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Object)
], UserSettingsEntity.prototype, "emailVerificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: bool_enum_1.BoolEnum, default: bool_enum_1.BoolEnum.NO }),
    __metadata("design:type", Number)
], UserSettingsEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: bool_enum_1.BoolEnum, default: bool_enum_1.BoolEnum.NO }),
    __metadata("design:type", Number)
], UserSettingsEntity.prototype, "isVerificationEmailSent", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: bool_enum_1.BoolEnum, default: bool_enum_1.BoolEnum.NO }),
    __metadata("design:type", Number)
], UserSettingsEntity.prototype, "isWelcomeEmailSent", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'userId' }),
    __metadata("design:type", String)
], UserSettingsEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUsers_1.UserEntity, (users) => users.userSetting, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'identifier' }),
    __metadata("design:type", tUsers_1.UserEntity)
], UserSettingsEntity.prototype, "users", void 0);
exports.UserSettingsEntity = UserSettingsEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: `user`, name: `usersSettings` })
], UserSettingsEntity);
