"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
const users_1 = require("../../modules/users");
const tUserKeys_1 = require("../../modules/users/infrastructures/entity/tUserKeys");
const tUserCredentials_1 = require("../../modules/users/infrastructures/entity/tUserCredentials");
/*
    Generate:
    npm run typeorm:generate src/core/config/dbMigrations/migrations/init

    Run:
    npm run typeorm:migrate
*/
const connectionOptions = {
    type: 'postgres',
    host: env_1.DB_HOST,
    port: parseInt(env_1.DB_PORT),
    username: env_1.DB_USERNAME,
    password: env_1.DB_PASSWORD,
    database: env_1.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [
        users_1.UserEntity,
        users_1.UserCommunicationEntity,
        users_1.UserSettingsEntity,
        tUserKeys_1.UserKeysEntity,
        tUserCredentials_1.UserCredentialsEntity,
    ],
    subscribers: [],
    migrations: ['src/core/config/dbMigrations/migrations/**/*.ts'],
    migrationsTableName: 'custom_migration_table',
};
exports.default = new typeorm_1.DataSource(Object.assign({}, connectionOptions));
