import { BaseDadataResponse } from "@/modules/interfaces/dadata/BaseDadataResponse";

export type City = BaseDadataResponse<
    Array<{
        value: string;
        unrestricted_value: string;
        data: {
            city: string;
            city_type_full: string | null;
            fias_level: string | null;
            city_district_type_full: string | null;
            street_type_full: string | null;
        };
    }>
>;
