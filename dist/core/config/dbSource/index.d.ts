import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
export declare const dbDataSource: DataSource;
declare function initializeDatabase(): Promise<void>;
declare function getQueryRunner(): QueryRunner;
declare function destroyDatabase(): Promise<void>;
export { initializeDatabase, getQueryRunner, QueryRunner, destroyDatabase, SelectQueryBuilder };
//# sourceMappingURL=index.d.ts.map