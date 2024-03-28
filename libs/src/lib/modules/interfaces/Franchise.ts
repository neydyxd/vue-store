import { MediaBlock } from "@/modules/interfaces/MediaBlock";

export interface Franchise {
    id: number;
    header: string;
    description: string;
    content: string;
    square: string;
    nomenclature: string;
    investmentVolume: string;
    averageCheck: string;
    picture: string;
    pictureExtra: string | null;
    logo: string;
    mediaBlocks?: MediaBlock[];
}
