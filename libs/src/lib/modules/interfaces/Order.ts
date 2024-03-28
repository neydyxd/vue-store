import { OrderProduct } from "@/modules/interfaces/OrderProduct";

import { DeliveryMethod } from "./DeliveryMethod";
import { OrderDocument } from "./OrderDocument";
import { OrderStatus } from "./OrderStatus";
import { PaymentMethod } from "./PaymentMethod";

export interface Order {
    id: number;
    syncUid: string;
    number1C: string;
    invoiceNumber: string;
    invoiceCost: number;
    documents: OrderDocument[];
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    reservedAt: Date;
    totalCost: number;
    positions: number;
    orderStatus?: OrderStatus;
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
    deliveryAddress?: string;
    deliveryDate?: Date | null;
    company?: string;
    contract?: string;
    products?: OrderProduct[];
    orderStates?: OrderStatus[];
    orderIp: string;
    goodsProblems: boolean;
    shipmentReceiver: string;
    contactPerson: string;
    errorMessage: string | null;
}
