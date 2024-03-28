import { Channel } from "./Channel";
import { FeatureGroup } from "./FeatureGroup";
import { FeatureType } from "./FeatureType";
import { FeatureUnitRelation } from "./FeatureUnitRelation";
import { FeatureValue } from "./FeatureValue";
import { Unit } from "./Unit";

export interface Feature {
    id: number;
    header: string;
    icon?: string;
    code?: string;
    enabled: boolean;
    isFilter: boolean;
    isInteger: boolean;
    required?: boolean;
    gold?: boolean;
    pos?: number;
    featureTypeId?: number;
    featureGroupId?: number;
    featureType?: FeatureType;
    featureGroup?: FeatureGroup;
    channels?: Channel[];
    values?: FeatureValue[];
    units?: Unit[];
    featureUnitRelation?: FeatureUnitRelation[];
    deleted?: boolean;
}
