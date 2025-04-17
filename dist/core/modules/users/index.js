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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModuleDbDataSourceEntity = void 0;
const tUserCommunication_1 = require("./infrastructures/entity/tUserCommunication");
const tUserCredentials_1 = require("./infrastructures/entity/tUserCredentials");
const tUserKeys_1 = require("./infrastructures/entity/tUserKeys");
const tUsers_1 = require("./infrastructures/entity/tUsers");
const tUserSettings_1 = require("./infrastructures/entity/tUserSettings");
// Entity Db Datasource Register
exports.userModuleDbDataSourceEntity = [
    tUsers_1.UserEntity,
    tUserKeys_1.UserKeysEntity,
    tUserCredentials_1.UserCredentialsEntity,
    tUserSettings_1.UserSettingsEntity,
    tUserCommunication_1.UserCommunicationEntity,
];
// User Module
__exportStar(require("../users/infrastructures/entity/tUserCommunication"), exports);
__exportStar(require("../users/infrastructures/entity/tUsers"), exports);
__exportStar(require("../users/infrastructures/entity/tUserSettings"), exports);
__exportStar(require("../users/infrastructures/entity/tUserKeys"), exports);
__exportStar(require("../users/infrastructures/entity/tUserCredentials"), exports);
__exportStar(require("../users/apps/feature/v1/addUsers"), exports);
__exportStar(require("../users/apps/feature/v1/getUserByIdentifier"), exports);
__exportStar(require("../users/apps/feature/v1/getVersion"), exports);
__exportStar(require("../users/apps/feature/v1/updateUsers"), exports);
__exportStar(require("../users/apps/feature/v1/updateVersion"), exports);
