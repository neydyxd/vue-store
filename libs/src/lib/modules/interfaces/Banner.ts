import { Picture } from "@/modules/interfaces/Picture";

export type Banner = {
    createdAt: string;
    deletePicture: boolean;
    deleted: boolean;
    enabled: boolean;
    header: string;
    link: string;
    id: number;
    picture: Picture;
    pictureId: number;
    extraPicture: Picture | null;
    extraMiddlePicture: Picture | null;
    extraBigPicture: Picture | null;
    pictureInput: null;
    pos: number;
    updatedAt: string;
};
