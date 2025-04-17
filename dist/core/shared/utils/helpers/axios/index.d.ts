import { AxiosRequestConfig } from 'axios';
import { Result } from 'neverthrow';
import { ResultError } from '../../exceptions/results';
export interface AxiosHelperConfig {
    baseURL: string;
    headers?: {
        apiKey?: string;
        token?: string;
    };
}
export declare class AxiosHelper {
    private axiosInstance;
    private apiKey?;
    private token?;
    constructor(config: AxiosHelperConfig);
    getAsync<TResponse>(endpoint: string, config?: AxiosRequestConfig): Promise<Result<TResponse, ResultError>>;
    postAsync<TRequest, TResponse>(endPoint: string, data: TRequest, config?: AxiosRequestConfig): Promise<Result<TResponse, ResultError>>;
    putAsync<TRequest, TResponse>(endPoint: string, data: TRequest, config?: AxiosRequestConfig): Promise<Result<TResponse, ResultError>>;
    deleteAsync<TResponse>(endPoint: string, config?: AxiosRequestConfig): Promise<Result<TResponse, ResultError>>;
    patchAsync<TRequest, TResponse>(endPoint: string, data: TRequest, config?: AxiosRequestConfig): Promise<Result<TResponse, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map