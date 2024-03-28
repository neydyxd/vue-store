import { SCREEN } from "@/modules/screen";

export enum AdaptiveImageSourceType {
    IMAGE_JPEG = "image/jpeg",
}

export interface AdaptiveImageSource {
    type?: AdaptiveImageSourceType;
    srcset: string;
    media: `(min-width: ${SCREEN}px)` | `(max-width: ${SCREEN}px)`;
}

export interface AdaptiveImageData {
    src: string;
    alt?: string;
    sources: AdaptiveImageSource[];
}
