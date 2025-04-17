import { StatusCodes } from 'http-status-codes';
export declare class PaginationDataResponseModel {
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
}
export declare class DataResponse<TData> {
    Success?: boolean;
    StatusCode?: StatusCodes;
    Data?: TData;
    Message?: string;
    Pagination?: PaginationDataResponseModel;
}
export declare class DataResponseFactory {
    static Response<TData>(success?: boolean, statusCode?: StatusCodes, data?: TData, message?: string, pagination?: PaginationDataResponseModel): DataResponse<TData>;
    static success<TData>(statusCode?: StatusCodes, data?: TData, message?: string, pagination?: PaginationDataResponseModel): DataResponse<TData>;
    static error<TData>(statusCode?: StatusCodes, message?: string, pagination?: PaginationDataResponseModel): DataResponse<TData>;
}
//# sourceMappingURL=data.Response.d.ts.map