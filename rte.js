var tools = [
    {
        name: 'bold',
        icon: 'B',
        check: /\*{2}.*\*{2}/g,
        replaceText: function(str) {
            var replaced = "";
            var match = str.match(this.check);
            if (match != null) {
                match.forEach(sub => {
                    var strong = document.createElement("strong");
                    var newStr = sub.replace(/\*{2}/g, "");
                    var node = document.createTextNode(newStr);
                    strong.appendChild(node);
                    replaced = str.replace(sub, strong.outerHTML);
                });
                return replaced;
            }
        },
        decorator: '**'
    },
    {
        name: 'italic',
        icon: 'I',
        check: /\*.*\*/g,
        replaceText: function(str) {
            var replaced = "";
            var match = str.match(this.check);
            if (match != null) {
            match.forEach(sub => {
                    var em = document.createElement("em");
                    var newStr = sub.replace(/\*/g, "");
                    var node = document.createTextNode(newStr);
                    em.appendChild(node);
                    replaced = str.replace(sub, em.outerHTML);
                });
                return replaced;
            }
        },
        decorator: '*'
    },
    {
        name: 'underline',
        icon: 'U',
        check: /_.*_/g,
        replaceText: function(str) {
            var replaced = "";
            var match = str.match(this.check);
            if (match != null) {
                match.forEach(sub => {
                    var span = document.createElement("span");
                    span.style.textDecoration = "underline";
                    var newStr = sub.replace(/_/g, "");
                    var node = document.createTextNode(newStr);
                    span.appendChild(node);
                    replaced = str.replace(sub, span.outerHTML);
                });
                return replaced;
            }
        },
        decorator: '_'
    },
    {
        name: 'strike',
        icon: 'S',
        check: /~.*~/g,
        replaceText: function(str) {
            var replaced = "";
            var match = str.match(this.check)
            if (match != null) {
                match.forEach(sub => {
                    var span = document.createElement("span");
                    span.style.textDecoration = "line-through";
                    var newStr = sub.replace(/~/g, "");
                    var node = document.createTextNode(newStr);
                    span.appendChild(node);
                    replaced = str.replace(sub, span.outerHTML);
                });
                return replaced;
            }
        },
        decorator: '~'
    }
]

class Wealthy {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;

        var el = document.getElementById(selector);
        el.style.width = options.size.width;

        var editor = document.createElement("textarea");
        var output = document.createElement("div");

        editor.className = "rt-editor";
        editor.style.resize = "none";
        editor.style.width = options.size.width;
        editor.style.height = options.size.height;
        editor.style.boxSizing = "border-box";
        editor.innerHTML = options.placeholder;
        editor.onchange = updateOutput;
        editor.onkeyup = updateOutput;

        function updateOutput(e) {
            var editorText = editor.value;      
            tools.forEach(tool => {
                var newText = tool.replaceText(editorText);
                output.innerHTML = newText;
            });
        }

        // function updateOutput(e) {
        //     var editorText = editor.value;
        //     options.toolbar.forEach(tool => {                
        //         var selected = tools.filter(select => select.name == tool)[0];
        //         if (selected != null) {
        //             var newText = selected.replaceText(editorText);
        //             output.innerHTML = newText;
        //         }
        //     });
        // }

        function formatText(e) {
            var decorator = tools.filter(select => select.name == e.currentTarget.className)[0].decorator;
            var start = editor.selectionStart;
            var finish = editor.selectionEnd;
            var selection = editor.value.substring(start, finish);
            var replace = editor.value.replace(editor.value.substring(start, finish), `${decorator}${selection}${decorator}`);
            editor.value = replace;
            
            updateOutput(e);
        }
        
        output.className = "editor-output";
        output.width = editor.offsetWidth;
        output.innerHTML = options.placeholder;
        output.width = "100%";

        if (options.theme) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `${options.theme.path}${options.theme.name}.css`;
            document.head.appendChild(link);
        }

        if (options.toolbar) {
            var toolbar = document.createElement("div");
            toolbar.className = "editor-toolbar";
            options.toolbar.forEach(tool => {
                var selected = tools.filter(select => select.name == tool)[0];
                var button = document.createElement("button");
                button.className = selected.name;
                button.innerHTML = selected.icon;
                button.title = selected.name;
                button.onclick = formatText;
                toolbar.appendChild(button);
            });
            el.appendChild(toolbar);
        }

        el.appendChild(editor);
        el.appendChild(output);
    }
}

let textEditor = new Wealthy('editor', {
    size: {
        width: "600px",
        height: "250px"
    },
    placeholder: "Write something here something",
    theme: {
        name: 'theme',
        path: ''
    },
    toolbar: ['bold', 'italic', 'underline']
});