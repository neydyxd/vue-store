import { InitData } from "@/modules/interfaces/InitData";
import { Token } from "@/modules/interfaces/Token";

export enum LSKeys {
    USER_INIT = "user_init",
    ACCESS_TOKEN = "token",
    REFRESH_TOKEN = "token_r",
}

export interface GetItemData {
    [LSKeys.USER_INIT]: InitData;
    [LSKeys.ACCESS_TOKEN]: Token["access"]["token"];
    [LSKeys.REFRESH_TOKEN]: Token["refresh"]["token"];
}

interface LsUtils {
    removeItem(key: LSKeys): void;
    setItem(key: LSKeys, payload: string): void;
    getItem<T extends LSKeys>(key: T): GetItemData[T] | null;
}

export const lsUtils: LsUtils = {
    removeItem(key) {
        localStorage.removeItem(key);
    },
    setItem(key, payload) {
        localStorage.setItem(key, payload);
    },
    getItem(key) {
        if (key === LSKeys.ACCESS_TOKEN || key === LSKeys.REFRESH_TOKEN) {
            return localStorage.getItem(key) as string;
        }

        return JSON.parse(localStorage.getItem(key) as string);
    },
};
