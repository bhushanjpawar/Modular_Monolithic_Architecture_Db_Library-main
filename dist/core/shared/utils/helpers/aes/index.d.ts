import { Result } from 'neverthrow';
import { IServiceHandlerAsync } from '../services';
import { ResultError } from '../../exceptions/results';
export declare class AES {
    private _ivLength;
    private readonly _encryptionKey;
    constructor(encryptionKey: string);
    encryptAsync(data: string): Promise<string>;
    decryptAsync(data: string): Promise<string>;
}
export interface IAesEncryptParameters<T extends object> {
    data: T;
    key: string;
}
export interface IAesEncryptWrapper<T extends object> extends IServiceHandlerAsync<IAesEncryptParameters<T>, string> {
}
export declare class AesEncryptWrapper<T extends object> implements IAesEncryptWrapper<T> {
    handleAsync(params: IAesEncryptParameters<T>): Promise<Result<string, ResultError>>;
}
export interface IAesDecryptParameters {
    data: string;
    key: string;
}
export interface IAesDecryptWrapper<T extends object> extends IServiceHandlerAsync<IAesDecryptParameters, T> {
}
export declare class AesDecryptWrapper<T extends object> implements IAesDecryptWrapper<T> {
    handleAsync(params: IAesDecryptParameters): Promise<Result<T, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map