export type Token = Record<
    "access" | "refresh",
    {
        token: string;
        info: string;
    }
>;
