import { Contract } from "./Contract";
import { CounterParty } from "./CounterParty";
import { CustomerGroup } from "./CustomerGroup";
import { Manager } from "./Manager";
import { Picture } from "./Picture";

export interface Customer {
    id?: number;
    company: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phone: string;
    counterParty: CounterParty[];
    managers: Manager[] | null;
    enabled: boolean;
    showPrice: boolean;
    updatedAt?: Date;
    createdAt?: Date;
    lastAuth?: Date;
    lastIp?: string;
    deleted?: boolean;
    customerGroup?: CustomerGroup;
    contracts?: Contract[];
    contractId?: number;
    picture?: Picture;
}
