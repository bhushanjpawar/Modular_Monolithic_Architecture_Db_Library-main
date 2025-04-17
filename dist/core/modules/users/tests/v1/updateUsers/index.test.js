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
const expect_1 = __importDefault(require("expect"));
const guid_typescript_1 = require("guid-typescript");
const node_test_1 = __importStar(require("node:test"));
const dbSource_1 = require("../../../../../config/dbSource");
const tUsers_1 = require("../../../infrastructures/entity/tUsers");
const status_enum_1 = require("../../../../../shared/models/enums/status.enum");
const updateUsers_1 = require("../../../apps/feature/v1/updateUsers");
const tUserCommunication_1 = require("../../../infrastructures/entity/tUserCommunication");
const tUserCredentials_1 = require("../../../infrastructures/entity/tUserCredentials");
const tUserKeys_1 = require("../../../infrastructures/entity/tUserKeys");
const tUserSettings_1 = require("../../../infrastructures/entity/tUserSettings");
// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
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
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.firstName = '';
        userEntity.lastName = '';
        userEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new updateUsers_1.UpdateUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '';
        userEntity.firstName = '';
        userEntity.lastName = '';
        //userEntity.status = StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new updateUsers_1.UpdateUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_validation_service_failed`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '';
        userEntity.firstName = '';
        userEntity.lastName = '';
        userEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userEntity.created_date = new Date();
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new updateUsers_1.UpdateUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_all_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_all_service_passed`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '754e1ad7-15c2-3f4b-ea37-83150bb826ab';
        userEntity.firstName = 'eshaan';
        //userEntity.lastName = 'naik';
        userEntity.status = status_enum_1.StatusEnum.ACTIVE;
        userEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const addUserServiceResult = await new updateUsers_1.UpdateUserService().handleAsync(userEntity, queryRunner);
        if (addUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(addUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(addUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunication_identifier_is_not_provided`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = '';
        userCommunicationEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_Status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunication_Status_is_not_provided`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = '';
        //userCommunicationEntity.status=StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_Validation_service_is_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunication_Validation_service_is_failed`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = '';
        userCommunicationEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCommunicationEntity.email = '';
        userCommunicationEntity.mobileNo = '';
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_all_service_is_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_userCommunication_all_service_is_passed`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = 'd8fe7ad1-0db4-e749-86b5-119c85134bc3';
        userCommunicationEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCommunicationEntity.email = 'jhonwick1@gmail.com';
        userCommunicationEntity.mobileNo = '9167777771';
        userCommunicationEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_emailId_already_exists' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunication_emailId_already_exists`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = 'd8fe7ad1-0db4-e749-86b5-119c85134bc3';
        userCommunicationEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCommunicationEntity.email = 'kishor.naik.dev@gmail.com';
        userCommunicationEntity.mobileNo = '9167777771';
        userCommunicationEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCommunication_mobileNo_already_exists' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCommunication_mobileNo_already_exists`, async () => {
        const userCommunicationEntity = new tUserCommunication_1.UserCommunicationEntity();
        userCommunicationEntity.identifier = 'd8fe7ad1-0db4-e749-86b5-119c85134bc3';
        userCommunicationEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCommunicationEntity.email = 'jhonwick1@gmail.com';
        userCommunicationEntity.mobileNo = '9167791111';
        userCommunicationEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCommunicationService().handleAsync(userCommunicationEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredential_identifier_is_not_provided`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = '';
        userCredentialsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredential_status_is_not_provided`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = '';
        //userCredentialsEntity.status=StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userCredential_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userCredential_validation_service_failed`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = '';
        userCredentialsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCredentialsEntity.username = '';
        userCredentialsEntity.hash = '';
        userCredentialsEntity.salt = '';
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userCredential_Services_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_userCredential_Services_passed`, async () => {
        const userCredentialsEntity = new tUserCredentials_1.UserCredentialsEntity();
        userCredentialsEntity.identifier = 'a3f321d4-f8ef-41ad-7e4b-9aedebdf9b64';
        userCredentialsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userCredentialsEntity.username = 'jhonwick@gmail.com';
        userCredentialsEntity.hash = 'e5240ea8-a2f5-4b17-9c13-9d9e4f3b5960';
        userCredentialsEntity.salt = '7978a832-579b-9974-70cc-21820a476636';
        userCredentialsEntity.modified_date = new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserCredentialsService().handleAsync(userCredentialsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(false);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeys_identifier_is_not_provided`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '';
        userKeysEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserKeysService().handleAsync(userKeysEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeys_status_is_not_provided`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '';
        //userKeysEntity.status=StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserKeysService().handleAsync(userKeysEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userKeys_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userKeys_validation_service_failed`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '';
        userKeysEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userKeysEntity.aesSecretKey = '';
        userKeysEntity.hmacSecretKey = '';
        userKeysEntity.refresh_token = '';
        userKeysEntity.refresh_Token_expires_at = new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserKeysService().handleAsync(userKeysEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userKeys_all_services_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_userKeys_all_services_passed`, async () => {
        const userKeysEntity = new tUserKeys_1.UserKeysEntity();
        userKeysEntity.identifier = '65abc507-944d-63f9-9ee2-0eea96a97784';
        userKeysEntity.status = status_enum_1.StatusEnum.INACTIVE;
        userKeysEntity.aesSecretKey = guid_typescript_1.Guid.create().toString();
        userKeysEntity.hmacSecretKey = guid_typescript_1.Guid.create().toString();
        //userKeysEntity.refresh_token=null;
        //userKeysEntity.refresh_Token_expires_at=new Date();
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserKeysService().handleAsync(userKeysEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(false);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(true);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettings_identifier_is_not_provided`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = '';
        userSettingsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettings_status_is_not_provided`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = '';
        //userSettingsEntity.status=StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userSettings_validation_service_failed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userSettings_validation_service_failed`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = 'd295b903-bb94-a6ef-c155-f9a702aa8301';
        userSettingsEntity.emailVerificationToken = '';
        userSettingsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userSettings_all_service_passed' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/updateUsers/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_userSettings_all_service_passed`, async () => {
        const userSettingsEntity = new tUserSettings_1.UserSettingsEntity();
        userSettingsEntity.identifier = 'd295b903-bb94-a6ef-c155-f9a702aa8301';
        userSettingsEntity.emailVerificationToken = '850f0dd9-5c77-0d94-9ab4-7cf65429cb56';
        userSettingsEntity.status = status_enum_1.StatusEnum.INACTIVE;
        await queryRunner.startTransaction();
        const updateUserServiceResult = await new updateUsers_1.UpdateUserSettingsService().handleAsync(userSettingsEntity, queryRunner);
        if (updateUserServiceResult.isErr()) {
            await queryRunner.rollbackTransaction();
            (0, expect_1.default)(updateUserServiceResult.isErr()).toBe(true);
            return;
        }
        await queryRunner.commitTransaction();
        (0, expect_1.default)(updateUserServiceResult.isOk()).toBe(false);
    });
});
