import { Contract } from "./Contract";

export interface CounterParty {
    id?: number;
    account: string;
    bank: string;
    beneficiary: string;
    bik: string;
    company: string;
    contract: Contract[];
    correspondentAccount: string;
    correspondentBank: string;
    correspondentSwift: string;
    factAddress: string;
    inn: string;
    kpp: string;
    legalAddress: string;
    ogrn: string;
    phone: string;
    swift: string;
    deleted?: boolean;
}
