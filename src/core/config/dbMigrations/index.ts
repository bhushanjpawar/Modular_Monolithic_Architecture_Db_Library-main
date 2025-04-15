import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../env';
import { UserCommunicationEntity, UserEntity, UserSettingsEntity } from '../../modules/users';
import { UserKeysEntity } from '../../modules/users/infrastructures/entity/tUserKeys';
import { UserCredentialsEntity } from '../../modules/users/infrastructures/entity/tUserCredentials';

/*
    Generate:
    npm run typeorm:generate src/core/config/dbMigrations/migrations/init

    Run:
    npm run typeorm:migrate
*/
const connectionOptions: DataSourceOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: parseInt(DB_PORT!),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: false,
	logging: true,
	entities: [
		UserEntity,
		UserCommunicationEntity,
		UserSettingsEntity,
		UserKeysEntity,
		UserCredentialsEntity,
	],
	subscribers: [],
	migrations: ['src/core/config/dbMigrations/migrations/**/*.ts'],
	migrationsTableName: 'custom_migration_table',
};

export default new DataSource({
	...connectionOptions,
});
