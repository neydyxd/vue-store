import { CartProduct } from "./CartProduct";
import { Customer } from "./Customer";
import { Settings } from "./Settings";
import { Warehouse } from "./Warehouse";

export interface InitData {
    user: Customer;
    settings: Settings;
    warehouseList: Warehouse[];
    cart?: CartProduct[];
}
