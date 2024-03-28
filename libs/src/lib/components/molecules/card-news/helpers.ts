import { CardNewsSizeConfigTypes } from "@/components/molecules/card-news/types";

export const cardNewsSizeConfig: CardNewsSizeConfigTypes = {
    large: {
        title: {
            as: "h3",
        },
        date: {
            size: "14",
            typeText: "subtitle",
        },
        description: {
            size: "15",
            typeText: "default",
        },
        link: {
            size: "18",
            typeText: "special-link",
        },
    },
    small: {
        title: {
            as: "h5",
        },
        date: {
            size: "12",
            typeText: "subtitle",
        },
        description: {
            size: "14",
            typeText: "default",
        },
        link: {
            size: "14",
            typeText: "special-link",
        },
    },
};
