import { Brand } from "@/modules/interfaces/Brand";

import { Pageble } from "./Pageble";

export interface PageApiResponse<T> {
    content: T;
    brands: Brand[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageble;
    size: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    totalElements: number;
    totalPages: number;
}
