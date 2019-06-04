class Wealthy extends HTMLElement {
    constructor(selector, config) {
        super();
        this.selector = selector;
        this.config = config;
        this.wealthy = (selector, config) => new Wealthy(selector, config);
        // set up and editor/toolbar
        let container = document.createElement("div");
        let wealthy = document.createElement("div");
        let toolbar = document.createElement("div");
        //let config = null;
        
        // add classes and other attributes
        container.className = "wealthy-cont"
        wealthy.className = "wealthy";
        wealthy.contentEditable = true;
        toolbar.className = "wealthy-tools"

        // get/set config
        if (this.hasAttribute('config')) {
            config = this.getAttribute('config');

            wealthy.innerHTML = config.placeholder;
        }
        if (this.config) {
            
        }

        //wealthy.innerHTML = "Here's the <strong>text</strong>!"

        // attach to DOM
        if (config)
            container.appendChild(toolbar);
        container.appendChild(wealthy);
        this.appendChild(container);
    }
}

window.customElements.define("wealthy-rte", Wealthy);