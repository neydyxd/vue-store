export class ResizableUtils {
    events: string[];
    int: number;
    el: HTMLInputElement;
    typeResize: "width" | "height";

    constructor(el: HTMLInputElement, factor?: number, typeResize: "width" | "height" = "width") {
        this.events = "keyup,focus,blur,change".split(",");
        this.int = Number(factor) || 7.7;
        this.el = el;
        this.typeResize = typeResize;
    }

    widthResize() {
        this.el.style.width = (this.el.value.length + 1) * this.int + "px";
    }

    heightResize() {
        this.el.style.height = (this.el.value.length + 1) * this.int + "px";
    }

    resizableInput() {
        for (const i in this.events)
            this.el.addEventListener(
                this.events[i],
                () => (this.typeResize === "width" ? this.widthResize() : this.heightResize()),
                false,
            );

        this.typeResize === "width" ? this.widthResize() : this.heightResize();
    }

    removeListeners() {
        for (const i in this.events)
            this.el.removeEventListener(
                this.events[i],
                () => (this.typeResize === "width" ? this.widthResize() : this.heightResize()),
                false,
            );
    }
}
