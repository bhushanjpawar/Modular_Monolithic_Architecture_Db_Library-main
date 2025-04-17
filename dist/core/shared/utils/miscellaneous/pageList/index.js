"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedList = void 0;
class PagedList {
    constructor(selectQueryBuilder, count, pageNumber, pageSize) {
        this.selectQueryBuilder = selectQueryBuilder;
        this.totalCount = count;
        this.pageSize = pageSize;
        this.currentPage = pageNumber;
        this.totalPages = Math.ceil(count / pageSize);
    }
    get hasPrevious() {
        return this.currentPage > 1;
    }
    get hasNext() {
        return this.currentPage < this.totalPages;
    }
    static async toPagedListAsync(queryBuilder, pageNumber, pageSize) {
        const countPromise = queryBuilder.getCount();
        const queryBuilderPaginationPromise = queryBuilder
            .skip((pageNumber - 1) * pageSize)
            .take(pageSize);
        const [count, queryBuilderPagination] = await Promise.all([
            countPromise,
            queryBuilderPaginationPromise,
        ]);
        return new PagedList(queryBuilderPagination, count, pageNumber, pageSize);
    }
}
exports.PagedList = PagedList;
