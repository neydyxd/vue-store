import { SCREEN, SCREEN_TYPE } from "@/modules/screen";

export function getSizeType(size: number): SCREEN_TYPE {
    if (size < SCREEN.EXTRA_LARGE_DESKTOP && size >= SCREEN.LARGE_DESKTOP) {
        return SCREEN_TYPE.LARGE_DESKTOP;
    } else if (size < SCREEN.LARGE_DESKTOP && size >= SCREEN.DESKTOP) {
        return SCREEN_TYPE.DESKTOP;
    } else if (size < SCREEN.DESKTOP && size >= SCREEN.SMALL_DESKTOP) {
        return SCREEN_TYPE.SMALL_DESKTOP;
    } else if (size < SCREEN.DESKTOP && size >= SCREEN.MOBILE_SMALL) {
        return SCREEN_TYPE.MOBILE_SMALL;
    } else if (size <= SCREEN.MOBILE_SMALL) {
        return SCREEN_TYPE.EXTRA_MOBILE_SMALL;
    }

    return SCREEN_TYPE.EXTRA_LARGE_DESKTOP;
}

export function isDesktopSize(screenType?: SCREEN_TYPE) {
    return (
        screenType === SCREEN_TYPE.EXTRA_LARGE_DESKTOP ||
        screenType === SCREEN_TYPE.LARGE_DESKTOP ||
        screenType === SCREEN_TYPE.DESKTOP ||
        screenType === SCREEN_TYPE.SMALL_DESKTOP
    );
}
