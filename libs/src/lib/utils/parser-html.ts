import { AsType as AsTypeText } from "@/components/atoms/text-adaptive/types";
import { AsType as AsTypeTitle } from "@/components/atoms/title-adaptive/types";
import { asText, asTitle } from "@/constants";
import { DataNode } from "domhandler/lib/node";
import parse from "html-dom-parser";

export interface ParseContentTextData {
    header: {
        tag: AsTypeTitle;
        text: string;
    };
    text: {
        tag: AsTypeText;
        text: string;
    };
}

export class ParserTextTags {
    initData: ParseContentTextData;
    html: string;

    constructor(html: string) {
        this.initData = {
            header: {
                tag: "h2",
                text: "",
            },
            text: {
                tag: "p",
                text: "",
            },
        };
        this.html = html;
    }

    isAsCheck(as: string): as is AsTypeTitle | AsTypeText {
        return asTitle.includes(as) || asText.includes(as);
    }

    recursionRootData(rootArray: ReturnType<typeof parse>, name?: AsTypeText | AsTypeTitle) {
        rootArray.forEach((element) => {
            if (element.type === "tag" && this.isAsCheck(element.name)) {
                this.initData[asTitle.includes(element.name) ? "header" : "text"].tag = element.name;

                this.recursionRootData(element.children as ReturnType<typeof parse>, element.name);

                return;
            }

            if (name) {
                this.initData[asTitle.includes(name) ? "header" : "text"].text = (element as DataNode).data;
            }
        });
    }

    baseParse() {
        const root = parse(this.html);

        this.recursionRootData(root);

        return this.initData;
    }
}
