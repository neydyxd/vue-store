import { CartProduct } from "@/modules/interfaces/CartProduct";
import { Stock } from "@/modules/interfaces/Stock";

export interface CartProductSpec extends CartProduct {
    importStatus: number;
    importKey: string;
    stocks?: Stock[];
}
