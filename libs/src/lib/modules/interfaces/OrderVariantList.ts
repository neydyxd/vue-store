import { OrderParam } from "@/modules/interfaces/OrderParam";

export interface OrderVariantList {
    amount: number;
    articul: string;
    catalogProductId: number;
    goodProblems: boolean | null;
    currencyCode: string;
    currencySign: string;
    groupHeader: null;
    header: string;
    manufacturerHeader: null;
    manufacturerId: number;
    manufacturerSeriesHeader: null;
    balancesOnGroupsOfWarehouses?: Record<string, number>;
    parentId: number;
    picture: string;
    price: number;
    productCustomer: null;
    productId: number;
    syncUid: string;
    unitHeader: null;
    variantList: null;
    volume: number;
    weight: number;
    priceRrc?: number;
    originalAmount?: number;
    originalPrice?: number;
    params: OrderParam[] | null;
}
