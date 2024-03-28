interface IBaseAccordionIcons {
    expandIconPrefix: string;
    collapseIconPrefix: string;
}

interface IBaseAccordionContentList {
    title: string;
    value: string;
}

export interface IBaseAccordionDataProps {
    icon?: IBaseAccordionIcons;
    title: string;
    contentList: IBaseAccordionContentList[];
}
