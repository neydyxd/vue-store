export type MaskType = "phone" | "only_symbols" | "only_symbols_hyphen" | "others";

export interface MaskData<T extends MaskType, U> {
    type: T;
    data: U;
}

export type MaskPhoneData = MaskData<
    "phone",
    {
        dialCode: string;
        mask: string;
        tokens: any;
    }
>;

export type MaskOnlySymbolsData = MaskData<
    "only_symbols",
    {
        mask: string;
        tokens: string;
    }
>;

export type MaskOnlySymbolsHyphenData = MaskData<
    "only_symbols_hyphen",
    {
        mask: string;
        tokens: string;
    }
>;
