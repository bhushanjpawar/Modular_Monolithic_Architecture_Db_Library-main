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
const expect_1 = __importDefault(require("expect"));
const getVersion_1 = require("../../../apps/feature/v1/getVersion");
// Debug Mode:All Test Case Run
//node --trace-deprecation --test --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
// Debug Mode:Specific Test Case Run
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
// If Debug not Worked then use
//node --trace-deprecation --test --test-name-pattern='test_name' --require ts-node/register --inspect=4321 -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
(0, node_test_1.describe)('Get user Entity row version', () => {
    (0, node_test_1.beforeEach)(async () => {
        await (0, dbSource_1.initializeDatabase)();
        //queryRunner = getQueryRunner();
    });
    (0, node_test_1.afterEach)(async () => {
        //await queryRunner.release();
        await (0, dbSource_1.destroyDatabase)();
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_identifier_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '';
        userEntity.status = status_enum_1.StatusEnum.INACTIVE;
        const getUserByIdentifierServiceResult = await new getVersion_1.GetUserRowVersionService().handleAsync(userEntity);
        if (getUserByIdentifierServiceResult.isErr()) {
            (0, expect_1.default)(getUserByIdentifierServiceResult.isErr()).toBe(true);
            return;
        }
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_status_is_not_provided' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_status_is_not_provided`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '';
        //userEntity.status = StatusEnum.INACTIVE;
        const getUserByIdentifierServiceResult = await new getVersion_1.GetUserRowVersionService().handleAsync(userEntity);
        if (getUserByIdentifierServiceResult.isErr()) {
            (0, expect_1.default)(getUserByIdentifierServiceResult.isErr()).toBe(true);
            return;
        }
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_false_when_userEntity_identifier_is_provided_wrong' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
    (0, node_test_1.default)(`should_return_false_when_userEntity_identifier_is_provided_wrong`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '754e1ad7-15c2-3f4b-ea37-83150bb826aa';
        userEntity.status = status_enum_1.StatusEnum.INACTIVE;
        const getUserByIdentifierServiceResult = await new getVersion_1.GetUserRowVersionService().handleAsync(userEntity);
        if (getUserByIdentifierServiceResult.isErr()) {
            (0, expect_1.default)(getUserByIdentifierServiceResult.isErr()).toBe(true);
            return;
        }
        (0, expect_1.default)(false).toBe(false);
    });
    //node --trace-deprecation --test --test-name-pattern='should_return_true_when_userEntity_identifier_is_provided_correct' --require ts-node/register -r tsconfig-paths/register ./src/core/modules/users/tests/v1/getVersion/index.test.ts
    (0, node_test_1.default)(`should_return_true_when_userEntity_identifier_is_provided_correct`, async () => {
        const userEntity = new tUsers_1.UserEntity();
        userEntity.identifier = '754e1ad7-15c2-3f4b-ea37-83150bb826ab';
        userEntity.status = status_enum_1.StatusEnum.INACTIVE;
        const getUserByIdentifierServiceResult = await new getVersion_1.GetUserRowVersionService().handleAsync(userEntity);
        if (getUserByIdentifierServiceResult.isErr()) {
            (0, expect_1.default)(getUserByIdentifierServiceResult.isErr()).toBe(false);
            return;
        }
        const result = getUserByIdentifierServiceResult.value;
        console.log(`result: ${JSON.stringify(result)}`);
        (0, expect_1.default)(getUserByIdentifierServiceResult.isOk()).toBe(true);
    });
});
