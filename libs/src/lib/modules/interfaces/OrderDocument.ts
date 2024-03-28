import { DocumentType } from "./DocumentType";

export interface OrderDocument {
    type: DocumentType;
    ext: string;
    fileName: string;
    header: string;
    size: number;
    createdAt: Date;
    hash: string;
}
