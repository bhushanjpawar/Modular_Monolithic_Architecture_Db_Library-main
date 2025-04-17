"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectQueryBuilder = exports.dbDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
exports.getQueryRunner = getQueryRunner;
exports.destroyDatabase = destroyDatabase;
const typeorm_1 = require("typeorm");
Object.defineProperty(exports, "SelectQueryBuilder", { enumerable: true, get: function () { return typeorm_1.SelectQueryBuilder; } });
const env_1 = require("../env");
const users_1 = require("../../modules/users");
exports.dbDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.DB_HOST,
    port: parseInt(env_1.DB_PORT),
    username: env_1.DB_USERNAME,
    password: env_1.DB_PASSWORD,
    database: env_1.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [...users_1.userModuleDbDataSourceEntity],
    subscribers: [],
    migrations: ['src/migration/**/*.ts'],
});
async function initializeDatabase() {
    await exports.dbDataSource.initialize();
}
function getQueryRunner() {
    return exports.dbDataSource.createQueryRunner();
}
async function destroyDatabase() {
    await exports.dbDataSource.destroy();
}
