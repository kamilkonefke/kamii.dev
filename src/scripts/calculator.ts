import { evaluate } from "mathjs";

var user_input: HTMLInputElement;
var result_text: HTMLElement;
var result_save_btn: HTMLElement;
var save_list: HTMLElement;

function init() {
    console.log("Hello, world!");

    user_input = document.getElementById("user-input") as HTMLInputElement;
    result_save_btn = document.getElementById("save-result-btn") as HTMLElement;
    result_text = document.getElementById("result") as HTMLElement;

    if(user_input && result_text) {
        user_input.addEventListener("input", (event) => { calculate(user_input.value) } );
        user_input.addEventListener("change", (event) => { save_result(result_text.innerHTML) } );
    }

    result_save_btn.addEventListener("click", (event) => { save_result(result_text.innerHTML) } );

    save_list = document.getElementById("save-list") as HTMLElement;
}

function save_result(result: string) {
    if (result == ":(" || result == "") {
        return;
    }
    save_list.insertAdjacentHTML("afterbegin", `<a class="saved-result">${result}</a>`);
}

function calculate(input: string) {
    input = input.toString().trim();
    if (input == "") {
        result_text.innerHTML = "";
        return;
    }

    try {
        const result = evaluate(input);
        if (typeof(result) == "number") {
            result_text.innerHTML = result.toString();
        }
    } catch (err) {
        result_text.innerHTML = ":(";
    }
}

document.addEventListener("astro:page-load", init );
