import { Department } from "@/modules/interfaces/Department";

export interface EmployeeDto {
    id: number;
    header: string;
    position: string;
    phone: string;
    extensionPhone: string | null;
    email: string;
    avatar: string;
    departments: Department[];
}
