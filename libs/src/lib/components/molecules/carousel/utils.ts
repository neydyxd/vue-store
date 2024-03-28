import { convertBannerToAdaptiveImageData } from "@/components/atoms/adaptive-img/helpers";
import { IBannerDataMain } from "@/components/templates/banner-template/types";
import { SCREEN_TYPE } from "@/modules/screen";

export function convertDataBanner(banner: string, link: string, hash = ""): IBannerDataMain {
    return {
        adaptiveImageData: convertBannerToAdaptiveImageData(banner),
        linkData: {
            link,
            hash,
        },
        isLinkBanner: false,
    };
}

export function getSliderPreviewForSize(sizeType?: SCREEN_TYPE): number | "auto" {
    switch (sizeType) {
        case SCREEN_TYPE.EXTRA_LARGE_DESKTOP:
            return 4;
        case SCREEN_TYPE.LARGE_DESKTOP:
            return 4;
        case SCREEN_TYPE.DESKTOP:
            return 3;
        case SCREEN_TYPE.SMALL_DESKTOP:
            return 3;
        default:
            return "auto";
    }
}
