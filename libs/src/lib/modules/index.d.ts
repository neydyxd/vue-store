declare module "*.png";
declare module "*.svg";

declare module "*.jpg" {
    const value: string;
    export = value;
}

declare module "*.json";

declare module "*.jpeg" {
    const value: string;
    export = value;
}
