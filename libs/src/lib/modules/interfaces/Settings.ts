import { SocialMediaSettings } from "./SocialMediaSettings";

export interface Settings {
    address: string;
    facebookLink: string;
    mainEmail: string;
    orderEmail: string;
    partnershipEmail: string;
    phone: string;
    partnershipPhone: string;
    siteLink: string;
    siteName: string;
    twitterLink: string;
    instagramLink: string;
    vkLink: string;
    youtubeLink: string;
    conditionalBalance: boolean;
    telegramLink?: string;
    socialMediaSettings: SocialMediaSettings | null;
}
