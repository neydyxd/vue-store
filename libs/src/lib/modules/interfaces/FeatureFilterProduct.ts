import { FeatureValuesFilterProduct } from "./FeatureValuesFilterProduct";

export interface FeatureFilterProduct {
    code: string;
    header: string;
    type: string;
    icon: string | null;
    featureValue?: FeatureValuesFilterProduct[];
}
