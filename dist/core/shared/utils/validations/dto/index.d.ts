import { Result } from 'neverthrow';
import { ResultError } from '../../exceptions/results';
import { IServiceHandlerAsync } from '../../helpers/services';
export interface IDtoValidationParameters<Tdto extends object> {
    dto: Tdto;
    dtoClass: new () => Tdto;
}
export interface IDtoValidation<Tdto extends object> extends IServiceHandlerAsync<IDtoValidationParameters<Tdto>, unknown> {
}
export declare class DtoValidation<Tdto extends object> implements IDtoValidation<Tdto> {
    handleAsync(params: IDtoValidationParameters<Tdto>): Promise<Result<unknown, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map