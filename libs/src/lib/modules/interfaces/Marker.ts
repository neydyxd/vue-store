import { MarkersHeader } from "@/pages/catalog-page/helpers";

export interface Marker<T = MarkersHeader> {
    header: string;
    icon: T;
    id: number;
}
