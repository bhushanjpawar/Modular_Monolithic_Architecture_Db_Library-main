import { Result } from 'neverthrow';
import { QueryRunner } from 'typeorm';
import { ResultError } from '../../../utils/exceptions/results';
export interface IDeleteService<TInput, TOutput> {
    handleAsync(params: TInput, queryRunner?: QueryRunner): Promise<Result<TOutput | null, ResultError>>;
}
export declare class DeleteService<T extends object> implements IDeleteService<T, T> {
    private readonly dtoValidation;
    constructor(entity: new () => T);
    private entity;
    handleAsync(params: T, queryRunner?: QueryRunner): Promise<Result<T | null, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map