export interface Organization {
    id?: number;
    company: string;
    inn: bigint;
    ogrn: string;
    deleted?: boolean;
    enabled?: boolean;
}
