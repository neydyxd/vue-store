export function resizableInput(elInput: HTMLInputElement, factor: number, typeResize: "width" | "height" = "width") {
    const int = Number(factor) || 7.7;
    function widthResize() {
        elInput.style.width = (elInput.value.length + 1) * int + "px";
    }

    function heightResize() {
        elInput.style.height = (elInput.value.length + 1) * int + "px";
    }

    const e = "keyup,keypress,focus,blur,change".split(",");

    for (const i in e) elInput.addEventListener(e[i], typeResize === "width" ? widthResize : heightResize, false);

    typeResize === "width" ? widthResize() : heightResize();
}
