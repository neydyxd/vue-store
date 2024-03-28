import { BrandDocument } from "@/modules/interfaces/BrandDocument";
import { MediaBlock } from "@/modules/interfaces/MediaBlock";

export interface BrandController {
    id: number;
    header: string;
    content: string;
    logo: string;
    banner: string;
    documents: BrandDocument[];
    createdAt: string;
    mediaBlocks?: MediaBlock[];
    url: string | null;
}
