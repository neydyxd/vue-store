export interface FeatureType {
    id: number;
    header: string;
    code: string;
    enabled?: boolean;
    pos?: number;
    isSystem?: boolean;
    deleted?: boolean;
}
