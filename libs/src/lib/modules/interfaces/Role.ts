export interface Role {
    id?: number;
    name: string;
    header: string;
    isSystem?: boolean;
    description?: string;
    deleted?: boolean;
}
