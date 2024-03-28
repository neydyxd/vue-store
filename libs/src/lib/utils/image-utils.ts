import PlugBigImg from "@/assets/image/plug-big.png";
import PlugMiniImg from "@/assets/image/plug-mini.png";
import { environment } from "@/environments/environment";
import { MiniaturePictureSize } from "@/environments/types";

type PlugType = "mini" | "default" | "big";

function getPlug(plug: PlugType = "default"): string {
    switch (plug) {
        case "big":
            return PlugBigImg;
        case "mini":
            return PlugMiniImg;
        default:
            return PlugMiniImg;
    }
}

export function getImg(
    src: string | null,
    plug: PlugType = "default",
    size: MiniaturePictureSize[keyof MiniaturePictureSize] = MiniaturePictureSize.original,
) {
    return {
        backgroundImage: `url(${src ? getPictureUrlFile(src, size) : getPlug(plug)})`,
    };
}

export function getPictureUrlFile(
    src: string,
    size: MiniaturePictureSize[keyof MiniaturePictureSize] = MiniaturePictureSize.original,
    extension?: string,
) {
    return `${environment.server_pictures_path(size)}/${src}${extension ? `.${extension}` : ""}`;
}
