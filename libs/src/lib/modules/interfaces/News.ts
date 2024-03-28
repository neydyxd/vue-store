import { NewsType } from "./NewsType";

export interface News {
    id?: number;
    anons?: string;
    content: string;
    header: string;
    pdate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    pictureInput?: File;
    picture?: string;
    deletePicture?: boolean;
    enabled?: boolean;
    deleted?: boolean;
    type: NewsType;
}

export interface INewsItem {
    id: number;
    header: string;
    anons: string;
    content: string;
    createdAt: string;
    picture: string;
    type: number;
}

export interface INewsQuery {
    header?: string;
    year?: number;
    month?: number;
}
