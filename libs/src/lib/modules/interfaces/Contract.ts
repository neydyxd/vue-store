import { CounterParty } from "./CounterParty";
import { Customer } from "./Customer";
import { Organization } from "./Organization";
import { Segment } from "./Segment";
import { TypePrice } from "./TypePrice";

export interface Contract {
    id?: number;
    header: string;
    priceType?: TypePrice;
    organization?: Organization;
    customer?: Customer;
    counterParty?: CounterParty;
    segments?: Segment[];
    limitDay?: bigint;
    limitSum?: bigint;
    reserve?: bigint;
    deleted?: boolean;
    enabled?: boolean;
    validityTerm: string;
}
