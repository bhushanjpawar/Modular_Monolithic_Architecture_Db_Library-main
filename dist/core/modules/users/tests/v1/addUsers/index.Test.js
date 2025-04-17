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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importStar(require("node:test"));
const dbSource_1 = require("../../../../../config/dbSource");
const tUsers_1 = require("../../../infrastructures/entity/tUsers");
const status_enum_1 = require("../../../../../shared/models/enums/status.enum");
const addUsers_1 = require("../../../apps/feature/v1/addUsers");
const expect_1 = __importDefault(require("expect"));
const guid_typescript_1 = require("guid-typescript");
const tUserCommunication_1 = require("../../../infrastructures/entity/tUserCommunication");
const tUserKeys_1 = require("../../../infrastructures/entity/tUserKeys");
const tUserSettings_1 = require("../../../infrastructures/entity/tUserSettings");
const tUserCredentials_1 = require("../../../infrastructures/entity/tUserCredentials");
const bool_enum_1 = require("../../../../../shared/models/enums/bool.enum");
// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
(0, node_test_1.describe)(`Create Users Unit Test`, () => {
    let queryRunner;
    (0, node_test_1.beforeEach)(async () => {
        await (0, dbSource_1.initializeDatabase)();
        queryRunner = (0, dbSource_1.getQueryRunner)();
    });
    (0, node_test_1.afterEach)(async () => {
        await queryRunner.release();
        await (0, dbSource_1.destroyDatabase)();
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.firstName = '';
        userEntity.lastName = '';
        userEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = guid_typescript_1.Guid.create().toString();
        userEntity.firstName = '';
        userEntity.lastName = '';
        //userEntity.status = StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_validation_service_failed`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = guid_typescript_1.Guid.create().toString();
        userEntity.firstName = '';
        userEntity.lastName = '';
        userEntity.clientId = '';
        userEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunicationEntity_identifier_is_not_provided`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = '';
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunicationEntity_status_is_not_provided`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = guid_typescript_1.Guid.create().toString();
        //userCommunicationEntity.status=StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunicationEntity_Validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunicationEntity_Validation_is_not_provided`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = guid_typescript_1.Guid.create().toString();
        userCommunicationEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userCommunicationEntity.email = '';
        userCommunicationEntity.mobileNo = '';
        //userCommunicationEntity.status=StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredentialEntity_identifier_is_not_provided`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = '';
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredentialEntity_status_is_not_provided`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = guid_typescript_1.Guid.create().toString();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredentialEntity_validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredentialEntity_validation_is_not_provided`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = guid_typescript_1.Guid.create().toString();
        userCredentialsEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userCredentialsEntity.hash = '';
        userCredentialsEntity.salt = '';
        userCredentialsEntity.username = '';
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeyEntity_identifier_is_not_provided`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '';
        userKeysEntity.status = status_enum_1.StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserKeyService().handleAsync(userKeysEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeyEntity_status_is_not_provided`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '';
        //userKeysEntity.status=StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserKeyService().handleAsync(userKeysEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeyEntity_Validation_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeyEntity_Validation_is_not_provided`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = guid_typescript_1.Guid.create().toString();
        userKeysEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userKeysEntity.aesSecretKey = '';
        userKeysEntity.hmacSecretKey = '';
        userKeysEntity.refresh_token = '';
        userKeysEntity.refresh_Token_expires_at = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserKeyService().handleAsync(userKeysEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettingsEntity_identifier_is_not_provided`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = '';
        userSettingsEntity.status = status_enum_1.StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettingsEntity_status_is_not_provided`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = '';
        //userSettingsEntity.status=StatusEnum.ACTIVE;
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    // node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettingsEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettingsEntity_status_is_not_provided`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = guid_typescript_1.Guid.create().toString();
        userSettingsEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userSettingsEntity.emailVerificationToken = '';
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_add_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/addUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_add_service_passed`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = guid_typescript_1.Guid.create().toString();
        userEntity.firstName = 'jhon';
        userEntity.lastName = 'wick`';
        userEntity.clientId = guid_typescript_1.Guid.create().toString();
        userEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new addUsers_1.AddUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        const userCommunication = new tUserCommunication_1.UserCommunicationEntity();
        userCommunication.identifier = guid_typescript_1.Guid.create().toString();
        userCommunication.email = 'jhonwick@gmail.com';
        userCommunication.userId = userEntity.identifier;
        userCommunication.mobileNo = '9167777777';
        userCommunication.status = status_enum_1.StatusEnum.INACTIVE;
        userCommunication.created_date = new Date();
        userCommunication.modified_date = new Date();
        //userCommunication.users=userEntity;
        //userEntity.userCommunication=userCommunication;
        const addUserCommunicationServiceResult = await new addUsers_1.AddUserCommunicationService().handleAsync(userCommunication, queryRunner);
        if (addUserCommunicationServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserCommunicationServiceResult.isErr()).toBe(true);
            return;
        }
        const userKeys = new tUserKeys_1.UserKeysEntity();
        userKeys.identifier = guid_typescript_1.Guid.create().toString();
        userKeys.refresh_token = guid_typescript_1.Guid.create().toString();
        userKeys.refresh_Token_expires_at = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        userKeys.userId = userEntity.identifier;
        userKeys.status = status_enum_1.StatusEnum.INACTIVE;
        userKeys.aesSecretKey = guid_typescript_1.Guid.create().toString();
        userKeys.hmacSecretKey = guid_typescript_1.Guid.create().toString();
        userKeys.created_date = new Date();
        userKeys.modified_date = new Date();
        //userToken.users=userEntity;
        //userEntity.userToken=userToken;
        const addUserTokenServiceResult = await new addUsers_1.AddUserKeyService().handleAsync(userKeys, queryRunner);
        if (addUserTokenServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserTokenServiceResult.isErr()).toBe(true);
            return;
        }
        const userSettings = new tUserSettings_1.UserSettingsEntity();
        userSettings.identifier = guid_typescript_1.Guid.create().toString();
        userSettings.userId = userEntity.identifier;
        userSettings.emailVerificationToken = guid_typescript_1.Guid.create().toString();
        userSettings.isEmailVerified = bool_enum_1.BoolEnum.NO;
        userSettings.status = status_enum_1.StatusEnum.INACTIVE;
        userSettings.created_date = new Date();
        userSettings.modified_date = new Date();
        //userSettings.users=userEntity;
        //userEntity.userSetting=userSettings;
        const addUserSettingsServiceResult = await new addUsers_1.AddUserSettingsService().handleAsync(userSettings, queryRunner);
        if (addUserSettingsServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserSettingsServiceResult.isErr()).toBe(true);
            return;
        }
        const userCredentials = new tUserCredentials_1.UserCredentialsEntity();
        userCredentials.identifier = guid_typescript_1.Guid.create().toString();
        userCredentials.status = status_enum_1.StatusEnum.INACTIVE;
        userCredentials.hash = guid_typescript_1.Guid.create().toString();
        userCredentials.salt = guid_typescript_1.Guid.create().toString();
        userCredentials.userId = userEntity.identifier;
        userCredentials.username = userCommunication.email;
        const addUserCredentialsServiceResult = await new addUsers_1.AddUserCredentialsService().handleAsync(userCredentials, queryRunner);
        if (addUserCredentialsServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserCommunicationServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(true).toBe(true);
    });
});
