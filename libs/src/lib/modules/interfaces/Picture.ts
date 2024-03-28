export interface Picture {
    id: number;
    name: string;
    sizeX: number;
    sizeY: number;
    type: string;
    deleted?: boolean;
    pos?: number;
}
