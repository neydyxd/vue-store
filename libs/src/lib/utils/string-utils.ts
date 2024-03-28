type KeyTranslations = "singularNominative" | "singularGenitive" | "pluralGenitive";

export type Translations = Record<KeyTranslations, string>;

export class StringUtils {
    static countFormatter(n: number, translations: Translations): string {
        return this.declOfNum(n, [
            translations.singularNominative,
            translations.singularGenitive,
            translations.pluralGenitive,
        ]);
    }
    private static declOfNum(n: number, titles: string[]): string {
        n = Math.abs(n);
        return titles[
            n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
        ];
    }

    static convertNumber(num = 0): string {
        return num.toLocaleString().replace(/\s/g, " ");
    }
}
