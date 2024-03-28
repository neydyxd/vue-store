import { BaseDadataResponse } from "@/modules/interfaces/dadata/BaseDadataResponse";

export type Country = BaseDadataResponse<
    Array<{
        value: string;
        unrestricted_value: string;
        data: {
            code: string;
            alfa2: string;
            alfa3: string;
            name_short: string;
            name: string;
        };
    }>
>;
