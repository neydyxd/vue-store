import { Picture } from "./Picture";
import { Role } from "./Role";

export interface Manager {
    id?: number;
    email: string;
    header: string;
    password?: string;
    phone: string;
    login: string;
    roles?: Role[];
    createdAt?: Date;
    lastAuth?: Date;
    lastIp?: string;
    enabled?: boolean;
    syncUid?: string;
    deleted?: boolean;
    pictureInput?: File;
    picture?: Picture;
    deletePicture?: boolean;
}
