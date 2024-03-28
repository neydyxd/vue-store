import { MarketplaceCatalog } from "./MarketplaceCatalog";

export interface Channel {
    id: number;
    header: string;
    enabled: boolean;
    marketplaceId: number;
    isSystem?: boolean;
    deleted?: boolean;
    selectedByDefault?: boolean;
    properties?: { [key: string]: string };
    categories?: MarketplaceCatalog[];
    catalogId: number;
    marketplaceCatalogId?: number;
}
