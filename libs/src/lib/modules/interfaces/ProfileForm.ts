export type ProfileForm = Record<"firstname" | "lastname" | "password" | "patronymic", string> & {
    email: string[];
};
