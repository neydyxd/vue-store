import { MiniaturePictureSize } from "@/environments/types";

export const __DOMAIN__ = "https://b2btest.gksm.local";

export const environment = {
    production: false,
    api_url: `${__DOMAIN__}/api/v1`,
    server_documents_path: `${__DOMAIN__}/documents`,
    server_pictures_path: (size: MiniaturePictureSize[keyof MiniaturePictureSize] = MiniaturePictureSize.original) =>
        `${__DOMAIN__}/pictures/${size}`,
};
