import { SizeType as SizeTypeText, TypeText } from "@/components/atoms/text-adaptive/types";
import { AsType as AsTypeTitle } from "@/components/atoms/title-adaptive/types";

// import { Pageble } from "@/modules/interfaces/Pageble";

export interface ICardNewsProps {
    src: string;
    title: string;
    date: string;
    description: string;
    link: string;
}

interface CardNewsTitleSizeData {
    as: AsTypeTitle;
}

interface CardNewsTextSizeData {
    size: SizeTypeText;
    typeText: TypeText;
}

export type CardNewsTypeProps = "horizontal" | "vertical";

export type CardNewsSizeTypes = "large" | "small";

export interface ICardNewsSizeConfig {
    title: CardNewsTitleSizeData;
    date: CardNewsTextSizeData;
    description: CardNewsTextSizeData;
    link: CardNewsTextSizeData;
}

export type CardNewsSizeConfigTypes = Record<CardNewsSizeTypes, ICardNewsSizeConfig>;
