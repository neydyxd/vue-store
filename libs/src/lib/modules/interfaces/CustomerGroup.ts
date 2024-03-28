import { WarehouseGroup } from "./WarehouseGroup";

export interface CustomerGroup {
    id?: number;
    name?: string;
    header: string;
    syncUid?: string;
    warehouseGroup?: WarehouseGroup[];
}
