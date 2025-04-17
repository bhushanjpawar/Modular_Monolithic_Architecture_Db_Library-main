import { Result } from 'neverthrow';
import { QueryRunner } from 'typeorm';
import { ResultError } from '../../../utils/exceptions/results';
export interface IGetVersionByIdentifierServiceResult {
    identifier: string;
    version: number;
}
export interface IGetVersionByIdentifierService<TInput> {
    handleAsync(params: TInput, queryRunner?: QueryRunner): Promise<Result<IGetVersionByIdentifierServiceResult | null, ResultError>>;
}
export declare class GetByVersionIdentifierService<T extends object> implements IGetVersionByIdentifierService<T> {
    private readonly dtoValidation;
    constructor(entity: new () => T);
    private entity;
    handleAsync(params: T, queryRunner?: QueryRunner): Promise<Result<IGetVersionByIdentifierServiceResult | null, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map