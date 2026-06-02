export class JoinDialog extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(`
            .dialog {
                position: absolute;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.3);
                top: 0;
                left: 0;
                display: none;
                justify-content: center;
                align-items: center;
            }
            .show {
                display: flex;
            }
            form {
                background-color: #fff;
                color: #000;
                padding: 1rem;
                border-radius: 10px;
                font-family: Arial;
            }
            label {
                display: block;
                font-weight: 600;
                font-size: 24px;
            }
            button {
                display: block;
                border: none;
                border-radius: 5px;
                background-color: #dbdbdb;
                color: black;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover {
                background-color: #cbcbcb;
            }
            input {
                margin-top: 10px;
                margin-bottom: 10px;
                border: 2px solid #dbdbdb;
                border-radius: 5px;
                font-size: 16px;
                padding: 8px;
            }
        `);
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.adoptedStyleSheets = [sheet];
        this.dialog = document.createElement("div");
        this.form = document.createElement("form");
        this.dialog.append(this.form);
        this.dialog.classList.add("dialog");
        this.shadow.append(this.dialog);
        this.form.innerHTML = `
            <label>Join Code</label>
            <input type="text" name="code" />
            <button type="submit">Join</button>
        `
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            let data = new FormData(e.target);
            data = Object.fromEntries(data.entries());

            // TODO: Add toast that code must not be empty
            if (!data.code.trim()) return;
            const submitEvent = new CustomEvent("submit", {
                detail: {
                    code: data.code.trim()
                }
            })

            this.dispatchEvent(submitEvent)
        })
    }

    show(){
        this.dialog.classList.toggle("show", true);
    }

    hide(){
        this.dialog.classList.toggle("show", false);
    }
}