export interface Pageble {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
    unpaged: boolean;
}
