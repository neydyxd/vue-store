import { Channel } from "./Channel";
import { Feature } from "./Feature";

export interface Catalog {
    id: number;
    header: string;
    icon?: string;
    syncUid?: string;
    htHead?: string;
    htDesc?: string;
    htKeywords?: string;
    parent?: Catalog;
    features?: Feature[];
    channels?: Channel[];
    parentId?: number;
    content?: string;
    enabled?: boolean;
    disabled?: boolean;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    lft?: number;
    rgt?: number;
    level?: number;
    lastLevel?: boolean;
    children?: Catalog[];
    productCount?: number;
    pos?: number;
}
