export interface IFaqItem {
    id: number;
    header: string;
    content: string;
    groupHeader: string;
    groupId: number;
}

export interface IFaqSection {
    header: string;
    faqData: IFaqItem[];
}
