export interface Organisation {
    value: string;
    unrestricted_value: string;
    data: {
        kpp: string;
        inn: string;
        ogrn: string;
        okpo: string;
        address: {
            unrestricted_value: string;
            value: string;
        };
    };
}
