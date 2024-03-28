import { IGridColumnsDataProps } from "@/components/molecules/grid-columns/types";
import { ParseContentTextData } from "@/utils/parser-html";

export enum MediaBlockTypes {
    HEADER_BLOCK = "header_block",
    GRID_BLOCK = "grid_block",
    GRID_REPEAT_BLOCK = "grid_column_repeat",
    HTML_BLOCK = "html_block",
}

export interface MediaBlockHeaderData {
    [MediaBlockTypes.HEADER_BLOCK]: ParseContentTextData;
}

export interface MediaBlockGridData {
    [MediaBlockTypes.GRID_BLOCK]: IGridColumnsDataProps[];
}

export interface MediaBlockGridRepeatData {
    [MediaBlockTypes.GRID_REPEAT_BLOCK]: IGridColumnsDataProps[];
}

export interface MediaBlockHTMLData {
    [MediaBlockTypes.HTML_BLOCK]: string;
}

export interface MediaBlockData {
    [key: string]: MediaBlockHeaderData | MediaBlockGridData | MediaBlockHTMLData | MediaBlockGridRepeatData;
}

interface ConvertMediaBlockHeader {
    type: string;
    data: ParseContentTextData;
}

interface ConvertMediaBlockGrid {
    type: string;
    data: IGridColumnsDataProps[];
}

interface ConvertMediaBlockRepeatGrid {
    type: string;
    data: IGridColumnsDataProps[];
}

interface ConvertMediaBlockHTML {
    type: string;
    data: string;
}

export type ConvertMediaBlocks = Array<
    ConvertMediaBlockHeader | ConvertMediaBlockGrid | ConvertMediaBlockRepeatGrid | ConvertMediaBlockHTML
>;
