import { SelectQueryBuilder } from 'typeorm';
export declare class PagedList<T extends object> {
    selectQueryBuilder: SelectQueryBuilder<T>;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    constructor(selectQueryBuilder: SelectQueryBuilder<T>, count: number, pageNumber: number, pageSize: number);
    get hasPrevious(): boolean;
    get hasNext(): boolean;
    static toPagedListAsync<T extends object>(queryBuilder: SelectQueryBuilder<T>, pageNumber: number, pageSize: number): Promise<PagedList<T>>;
}
//# sourceMappingURL=index.d.ts.map