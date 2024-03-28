import { CartParam } from "@/modules/interfaces/CartParam";

import { CommercePrice } from "./CommercePrice";
import { Marker } from "./Marker";

export interface CartProduct {
    discount?: number | null;
    id: number | null;
    amount: number;
    articul: string;
    header: string;
    description: string;
    manufacturerHeader: string;
    unitHeader: string;
    price: number;
    picture: string | null;
    productId: number | null;
    syncUid: string | null;
    manufacturerId?: number | null;
    manufacturerSeriesHeader?: string | null;
    commercePrice?: CommercePrice | null;
    flatCodes?: Map<string, string>;
    stock?: Map<string, number>;
    balancesOnGroupsOfWarehouses?: Record<string, number>;
    markers?: Marker[];
    supplyTerm?: number;
    multiplicityOrder?: number;
    multiplicitySupplier?: number;
    selected?: boolean;
    importKey?: string;
    productStatusId?: number;
    similarProductList?: CartProduct[];
    analogCount?: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    variantList: CartProduct[] | null;
    params: CartParam[] | null;
}
