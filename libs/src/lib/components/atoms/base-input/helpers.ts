import { MaskOnlySymbolsData, MaskPhoneData } from "@/components/atoms/base-input/types";

export class Mask {
    static getTypeMask(maskData: MaskPhoneData | MaskOnlySymbolsData | null): string {
        if (!maskData) return "";
        else return maskData.data.mask;
    }

    static getUnmaskedValue(maskData: MaskPhoneData | MaskOnlySymbolsData | null, value: string): string {
        if (!maskData) return value;
        else {
            switch (maskData.type) {
                case "phone":
                    return `${maskData.data.dialCode}${value}`;
                case "only_symbols":
                    return value;
                default:
                    return value;
            }
        }
    }

    static getUnmaskedPhoneValue(dialCode: string, value: string) {
        return `${dialCode}${value}`;
    }
}
