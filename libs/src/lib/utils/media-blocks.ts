import { environment } from "@/environments/environment";
import { MediaBlock } from "@/modules/interfaces/MediaBlock";
import {
    ConvertMediaBlocks,
    MediaBlockData,
    MediaBlockGridData,
    MediaBlockGridRepeatData,
    MediaBlockTypes,
} from "@/modules/interfaces/MediaBlockSectionTypes";
import { ParseContentTextData, ParserTextTags } from "@/utils/parser-html";

export class MediaBlocksUtility {
    mediaBlocks: MediaBlock[];
    convertMediaBlocks: ConvertMediaBlocks;
    constructor(mediaBlocks: MediaBlock[]) {
        /*
            fullTypeBlock - это строка/название медиа блока, которая приходит с бэка.

            Название медиаблока представляет из себя набор уникальных значений для парсера.
            type:unique_name:name

            type - тип составной части для медиа блока.
            unique_name - уникальное название блока для страницы.
            name - название блока.
         */
        this.mediaBlocks = mediaBlocks;
        this.convertMediaBlocks = [];
    }

    /*
        Получение составного типа блока
     */
    private getType(fullTypeBlock: string): MediaBlockTypes | null {
        return (Object.values(MediaBlockTypes) as MediaBlockTypes[]).some(
            (block) => block === fullTypeBlock.split(":")[0],
        )
            ? (fullTypeBlock.split(":")[0] as MediaBlockTypes)
            : null;
    }

    /*
        Получение уникального названия блока
     */
    private getUniqueName(fullTypeBlock: string): string | null {
        return fullTypeBlock.split(":")[1] ? fullTypeBlock.split(":")[1] : null;
    }

    /*
        Получение названия блока
     */
    private getName(fullTypeBlock: string): string | null {
        return fullTypeBlock.split(":")[2] ? fullTypeBlock.split(":")[2] : null;
    }

    private getTypeHeaderBlock(block: MediaBlock): ParseContentTextData {
        return new ParserTextTags(block.content).baseParse();
    }

    private getGridColumnBlock(block: MediaBlock) {
        const root = new ParserTextTags(block.content).baseParse();

        return {
            title: root.header.text,
            description: root.text.text,
            src: `${environment.server_pictures_path()}/${block.picture}`,
        };
    }

    convertBlocks() {
        const mediaBlockObject = {} as MediaBlockData;

        this.mediaBlocks
            .sort((a, b) => a.id - b.id)
            .forEach((mediaBlock) => {
                const type = this.getType(mediaBlock.header);
                const unique_name = this.getUniqueName(mediaBlock.header);

                if (type && unique_name) {
                    if (type === MediaBlockTypes.GRID_BLOCK) {
                        mediaBlockObject[unique_name] = {
                            [MediaBlockTypes.GRID_BLOCK]: [
                                ...((mediaBlockObject[unique_name] as MediaBlockGridData)?.[
                                    MediaBlockTypes.GRID_BLOCK
                                ] || []),
                                this.getGridColumnBlock(mediaBlock),
                            ],
                        };
                    }

                    if (type === MediaBlockTypes.GRID_REPEAT_BLOCK) {
                        mediaBlockObject[unique_name] = {
                            [MediaBlockTypes.GRID_REPEAT_BLOCK]: [
                                ...((mediaBlockObject[unique_name] as MediaBlockGridRepeatData)?.[
                                    MediaBlockTypes.GRID_REPEAT_BLOCK
                                ] || []),
                                this.getGridColumnBlock(mediaBlock),
                            ],
                        };
                    }

                    if (type === MediaBlockTypes.HEADER_BLOCK) {
                        mediaBlockObject[unique_name] = {
                            [MediaBlockTypes.HEADER_BLOCK]: this.getTypeHeaderBlock(mediaBlock),
                        };
                    }

                    if (type === MediaBlockTypes.HTML_BLOCK) {
                        mediaBlockObject[unique_name] = {
                            [MediaBlockTypes.HTML_BLOCK]: mediaBlock.content,
                        };
                    }
                }
            });

        this.convertMediaBlocks = Object.values(mediaBlockObject)
            .map((block) =>
                (Object.keys(block) as `${MediaBlockTypes}`[]).map((key) => ({
                    type: key,
                    data: block[key as keyof typeof block],
                })),
            )
            .flat();

        return this.convertMediaBlocks;
    }
}
