import { CartProduct } from "@/modules/interfaces/CartProduct";
import { Order } from "@/modules/interfaces/Order";
import { OrderProduct } from "@/modules/interfaces/OrderProduct";
import { ProductCustomer } from "@/modules/interfaces/ProductCustomer";

export class ProductUtils {
    static getCommercePriceCartProduct<T extends CartProduct>(product: T) {
        const productFilter = product.variantList?.find((variant) => variant.commercePrice?.price);
        return productFilter ? productFilter.commercePrice?.price : 0;
    }

    static getCommercePriceProductCustomer<T extends ProductCustomer>(product: T) {
        const productFilter = product.variantList?.find((variant) => variant.commercePrice?.price);
        return productFilter ? productFilter.commercePrice?.price : 0;
    }

    static getCommercePriceOrderProduct(product: OrderProduct) {
        const productFilter = product.variantList?.find((variant) => variant?.price);
        return productFilter ? productFilter.price : 0;
    }

    static getGeneralQuantitySelectProduct(product: CartProduct) {
        if (product.variantList) {
            return product.variantList.reduce((acc, curr) => (acc += curr.amount), 0);
        } else {
            return product.amount;
        }
    }

    static getGeneralSumSelectProduct(cartProduct: CartProduct): number {
        if (cartProduct.variantList) {
            return cartProduct.variantList?.reduce((acc, curr) => {
                if (curr.commercePrice) {
                    acc += curr.amount * curr.commercePrice?.price;
                } else {
                    acc += curr.amount * curr.price;
                }

                return acc;
            }, 0);
        } else {
            let sum = 0;
            if (cartProduct.commercePrice) {
                sum = +cartProduct.amount * cartProduct.commercePrice?.price;
            }

            return sum;
        }
    }

    static getOrderGeneralQuantityVariantList(order: Order): number {
        return (
            order?.products?.reduce((cartAcc, cartCurr) => {
                let quantity = 0;
                if (!cartCurr.id && cartCurr.variantList) {
                    quantity += cartCurr.variantList.reduce((acc, curr) => {
                        if (curr.price) acc += curr.amount;
                        return acc;
                    }, 0);
                }

                return (cartAcc += quantity);
            }, 0) || 0
        );
    }

    static getOrderGeneralQuantityNonSizeProduct(order: Order): number {
        return (
            order?.products?.reduce((acc, curr) => {
                if (!curr.variantList) {
                    acc += curr["amount"];
                }

                return acc;
            }, 0) || 0
        );
    }

    static getOrderGeneralSumCartVariantList(order: Order): number {
        return (
            order?.products?.reduce((cartAcc, cartCurr) => {
                let sum = 0;
                if (!cartCurr.id && cartCurr.variantList) {
                    sum += cartCurr.variantList.reduce((acc, curr) => {
                        if (curr.price) acc += curr.amount * curr.price;
                        return acc;
                    }, 0);
                }

                return (cartAcc += sum);
            }, 0) || 0
        );
    }

    static getOrderGeneralSumCartNonSizeProduct(order: Order): number {
        return (
            order?.products?.reduce((acc, curr) => {
                if (!curr.variantList) {
                    acc = acc += curr["price"] * curr["amount"];
                }

                return acc;
            }, 0) || 0
        );
    }
}
