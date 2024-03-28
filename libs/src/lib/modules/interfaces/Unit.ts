export interface Unit {
    id: number;
    header: string;
    smallHeader: string;
    enabled: boolean;
    isSystem?: boolean;
    deleted?: boolean;
    unitType?: string;
    parent?: number;
    subUnit?: Unit[];
}
