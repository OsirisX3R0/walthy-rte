class Wealthy extends HTMLElement {
    constructor() {
        super();
        // set up shadow DOM and editor/toolbar
        const shadow = this.attachShadow({mode: 'open'});
        let wealthy = document.createElement("div");
        let toolbar = document.createElement("div");
        
        // basic styles
        wealthy.style.width = "600px";
        wealthy.style.height = "275px";
        wealthy.style.backgroundColor = "#555";
        wealthy.style.padding = "8px"
        wealthy.contentEditable = true;

        //wealthy.innerHTML = "Here's the <strong>text</strong>!"

        // attach to shadow DOM
        shadow.appendChild(wealthy);
    }
}

window.customElements.define("wealthy-rte", Wealthy);