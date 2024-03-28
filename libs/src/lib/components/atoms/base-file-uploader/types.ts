export type GeneralInfo = {
    title: string;
    description: string;
    icon: string;
};

export enum AcceptImageEnum {
    JPEG = ".jpeg",
    PDF = ".pdf",
    JPG = ".jpg",
    PNG = ".png",
}

export enum AcceptFilesEnum {
    XLSX = ".xlsx",
    XLX = ".xlx",
    TXT = ".txt",
    CSV = ".csv",
}

export type AcceptPropTypes = Array<AcceptImageEnum | AcceptFilesEnum>;

export interface ISizeHeightWeightProps {
    width: number;
    height: number;
}
