import { MediaBlock } from "@/modules/interfaces/MediaBlock";
import { Picture } from "@/modules/interfaces/Picture";

export interface TextPage {
    id: number;
    header: string;
    content: string;
    createdAt: Date;
    picture: Picture;
    mediaBlocks?: MediaBlock[];
}
