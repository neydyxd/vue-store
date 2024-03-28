import { Feature } from "./Feature";
import { FeatureFilterProduct } from "./FeatureFilterProduct";
import { FeatureValuesFilterProduct } from "./FeatureValuesFilterProduct";

export interface FeatureFilter {
    featureProduct: FeatureFilterProduct[];
    features: Feature[];
    featureValueCount: number[];
    templateAggr: FeatureValuesFilterProduct[];
}
