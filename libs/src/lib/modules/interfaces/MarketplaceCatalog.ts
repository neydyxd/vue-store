export interface MarketplaceCatalog {
    id: number;
    header: string;
    children: MarketplaceCatalog[];
    lastLevel?: boolean;
    checked?: boolean;
}
