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
exports.UserCommunicationEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../../../../../shared/entity/base");
const tUsers_1 = require("../tUsers");
const class_validator_1 = require("class-validator");
let UserCommunicationEntity = class UserCommunicationEntity extends base_1.BaseEntity {
};
exports.UserCommunicationEntity = UserCommunicationEntity;
__decorate([
    (0, typeorm_1.Column)(`varchar`, { length: 100, nullable: false }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserCommunicationEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(`varchar`, { nullable: false }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMobilePhone)('en-IN'),
    __metadata("design:type", String)
], UserCommunicationEntity.prototype, "mobileNo", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'userId' }),
    __metadata("design:type", String)
], UserCommunicationEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tUsers_1.UserEntity, (users) => users.userCommunication, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'identifier' }),
    __metadata("design:type", tUsers_1.UserEntity)
], UserCommunicationEntity.prototype, "users", void 0);
exports.UserCommunicationEntity = UserCommunicationEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'user', name: `usersCommunication` })
], UserCommunicationEntity);
