import { DepartmentSmMini } from "@/modules/interfaces/DepartmentSmMini";
import { Picture } from "@/modules/interfaces/Picture";

export interface Employee {
    id: number;
    header: string;
    position: string;
    phone: string;
    email: string;
    departments: DepartmentSmMini[];
    enabled: boolean;
    deleted: boolean;
    sportmasterMini: boolean;
    createdAt: Date;
    updatedAt: Date;
    pictureId: number;
    pictureInput: string;
    deletePicture: boolean;
    picture: Picture;
    extensionPhone: string | null;
}
