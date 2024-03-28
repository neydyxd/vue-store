export interface LazyCatalog {
    id: number;
    header: string;
    level: number;
    lastLevel: boolean;
    isLoading: boolean;
    productCount: number;
    productCountAdditional: number;
    parentId?: number;
    icon?: string;
    syncUid?: string;
    lft?: number;
    rgt?: number;
    pos?: number;
    picture?: string;
    disabled?: boolean;
    expanded?: boolean;
    children?: LazyCatalog[];
}
