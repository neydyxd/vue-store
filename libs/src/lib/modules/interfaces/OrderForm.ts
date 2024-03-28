export enum SourceOrderProduct {
    CART,
    SPECIFICATION,
    ORDER,
    ORDER_PART,
}

export interface OrderForm {
    deliveryMethodId: number;
    pickupAddressId: number;
    contactPersonId: number;
    counterPartyId: number;
    comment: string;
    source: SourceOrderProduct;
    deliveryPointId: number;
    deliveryDate: Date | string;
    cart: number[];
    contractId: number;
}
