import { AdaptiveImageData, AdaptiveImageSource, AdaptiveImageSourceType } from "@/components/atoms/adaptive-img/types";
import { MiniaturePictureSize } from "@/environments/types";
import { Banner } from "@/modules/interfaces/Banner";
import { SCREEN } from "@/modules/screen";
import { getPictureUrlFile } from "@/utils/image-utils";

export function convertBannerToAdaptiveImageData(
    banner: Banner | string,
    type = AdaptiveImageSourceType.IMAGE_JPEG,
): AdaptiveImageData {
    if (typeof banner === "string") {
        return {
            src: getPictureUrlFile(banner, MiniaturePictureSize.original),
            sources: [],
        };
    } else {
        return {
            src: getPictureUrlFile(banner.picture.name, MiniaturePictureSize.original, banner.picture.type),
            alt: String(banner.pictureId),
            sources: getImagesArray(banner, type),
        };
    }
}

function getImagesArray(banner: Banner, type: AdaptiveImageSourceType) {
    const arr: AdaptiveImageSource[] = [];

    if (banner.extraPicture) {
        arr.push(getImageItem(type, banner.extraPicture.name, banner.extraPicture.type, 420));
    }

    if (banner.extraMiddlePicture) {
        arr.push(getImageItem(type, banner.extraMiddlePicture.name, banner.extraMiddlePicture.type, 960));
    }

    if (banner.extraBigPicture) {
        arr.push(getImageItem(type, banner.extraBigPicture.name, banner.extraBigPicture.type, 1280));
    }

    return arr;
}

function getImageItem(
    type: AdaptiveImageSourceType,
    name: string,
    typeImage: string,
    size: SCREEN,
): AdaptiveImageSource {
    return {
        type,
        srcset: getPictureUrlFile(name, MiniaturePictureSize.original, typeImage),
        media: `(max-width: ${size}px)`,
    };
}
