import 'reflect-metadata';
import { Result } from 'neverthrow';
import { ResultError } from './shared/utils/exceptions/results';
import { RequestData, RequestHandler } from 'mediatr-ts';
import { DataResponse } from './shared/models/response/data.Response';
export interface IAdd {
    add(a: number, b: number): Result<number, ResultError>;
}
export declare class Add implements IAdd {
    add(a: number, b: number): Result<number, ResultError>;
}
export declare class AddRequestDTO {
    a?: number;
    b?: number;
}
export declare class AddResponseDTO {
    result?: number;
}
export declare class AddCommand extends RequestData<DataResponse<AddResponseDTO | null>> {
    constructor(addRequest: AddRequestDTO);
    private _addRequest;
    get addRequest(): AddRequestDTO;
}
export declare class AddCommandHandler implements RequestHandler<AddCommand, DataResponse<AddResponseDTO | null>> {
    private readonly _add;
    private readonly _dtoValidator;
    constructor();
    handle(value: AddCommand): Promise<DataResponse<AddResponseDTO | null>>;
}
export declare class Main {
    addCall(a: number, b: number): Promise<DataResponse<AddResponseDTO | null>>;
}
//# sourceMappingURL=demo.d.ts.map