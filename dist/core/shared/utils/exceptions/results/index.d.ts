import { Result } from 'neverthrow';
import { StatusCodes } from 'http-status-codes';
export declare class ResultError {
    statusCode: StatusCodes;
    message: string;
    constructor(statusCode: StatusCodes, message: string);
}
export declare class ResultExceptionFactory {
    static error<T>(statusCode: StatusCodes, message: string): Result<T, ResultError>;
    static errorInstance<T>(resultError: ResultError): Result<T, ResultError>;
}
//# sourceMappingURL=index.d.ts.map