export interface PaginatedModel<T> {
    data: T[];
    metadata: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
}
