import { FeatureUnit } from "./FeatureUnit";
import { Unit } from "./Unit";

export interface FeatureUnitRelation {
    unitId?: number;
    featureId?: number;
    units?: Unit[];
    featureUnitRelationId?: FeatureUnit;
    unit?: Unit;
}
