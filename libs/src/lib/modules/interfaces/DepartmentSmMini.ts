import { DepartmentCountry } from "@/modules/interfaces/DepartmentCountry";

export interface DepartmentSmMini {
    id: number;
    header: string;
    country: DepartmentCountry;
    wholesaleEmail: string;
    franchiseEmail: string;
    enabled: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
