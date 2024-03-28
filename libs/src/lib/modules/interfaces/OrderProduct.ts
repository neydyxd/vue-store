import { OrderVariantList } from "@/modules/interfaces/OrderVariantList";

export interface OrderProduct {
    id: number;
    productId: number;
    syncUid: string;
    articul: string;
    header: string;
    unitHeader: string;
    manufacturerId: number;
    manufacturerHeader: string;
    balancesOnGroupsOfWarehouses?: Record<string, number>;
    manufacturerSeriesHeader: string;
    price: number;
    currencyCode: string;
    currencySign: string;
    amount: number;
    picture: string;
    catalogProductId: number;
    priceRrc?: number;
    variantList: OrderVariantList[] | null;
    quantity: number;
}
