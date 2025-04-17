import { Result } from 'neverthrow';
import { QueryRunner } from 'typeorm';
import { PagedList } from '../../../utils/miscellaneous/pageList';
import { ResultError } from '../../../utils/exceptions/results';
import { ObjectLiteral } from 'typeorm';
import { IPagination } from '../../../models/types/pagination';
import { ISort } from '../../../models/types/order';
export interface IGetService<TInput extends ObjectLiteral, TOutput extends object> {
    handleAsync(params: TInput, pagination?: IPagination | null, sort?: ISort | null, queryRunner?: QueryRunner): Promise<Result<PagedList<TOutput>, ResultError>>;
}
export declare class GetService<T extends object> implements IGetService<T, T> {
    private readonly dtoValidation;
    constructor(entity: new () => T);
    private entity;
    handleAsync(params: T, pagination: IPagination | null, sort?: ISort | null, queryRunner?: QueryRunner): Promise<Result<PagedList<T>, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map