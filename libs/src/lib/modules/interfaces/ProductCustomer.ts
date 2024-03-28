import { ProductParam } from "@/modules/interfaces/ProductParam";

import { AvailabilityType } from "./AvailabilityType";
import { Certificate } from "./Certificate";
import { CommercePrice } from "./CommercePrice";
import { DocumentLink } from "./DocumentLink";
import { Marker } from "./Marker";
import { ProductCodeValue } from "./ProductCodeValue";
import { Stock } from "./Stock";
import { Video } from "./Video";

export interface ProductCustomer {
    discount?: number;
    id: number | null;
    header: string;
    barCode?: string;
    articul?: string;
    syncUid: string;
    content?: string;
    description?: string;
    price?: number;
    commercePrice?: CommercePrice;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    productStatusId?: number;
    unitHeader?: string;
    terms?: string[];
    picture?: string;
    pictures?: string[];
    brandHeader?: string;
    manufacturerHeader?: string;
    manufacturerSeriesHeader?: string;
    manufacturerSiteLink?: string;
    features?: {
        header: string;
        values: Array<{
            header: string;
            code: string;
            value: string;
        }>;
    };
    codes?: ProductCodeValue[];
    videos?: Video[];
    analogList?: ProductCustomer[];
    relatedList?: ProductCustomer[];
    certificateList?: Certificate[];
    importKey?: string;
    stocks?: Stock[];
    flatCodes?: Map<string, string>;
    balancesOnGroupsOfWarehouses?: Record<string, number>;
    availabilityOnGroupsOfWarehouses?: Map<string, AvailabilityType>;
    multiplicityOrder?: number;
    multiplicitySupplier?: number;
    markers: Marker[];
    supplyTerm: number;
    documentList?: DocumentLink[];
    variantList: ProductCustomer[] | null;
    params: ProductParam[];
    sameModels: ProductCustomer | null;
    pos: number;
}
