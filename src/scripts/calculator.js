import { evaluate } from "mathjs";

var user_input;
var result_text;
var result_save_btn;
var save_list;

function init() {
    console.log("Hello, world!");
    user_input = document.getElementById("user-input");

    user_input.addEventListener("input", (event) => { calculate(user_input.value) } );
    user_input.addEventListener("change", (event) => { save_result(result_text.innerHTML) } );

    result_text = document.getElementById("result");

    result_save_btn = document.getElementById("save-result-btn");
    result_save_btn.addEventListener("click", (event) => { save_result(result_text.innerHTML) } );

    save_list = document.getElementById("save-list");
}

function save_result(result) {
    if (result == ":(" || result == "") {
        return;
    }
    save_list.insertAdjacentHTML("afterbegin", `<a class="saved-result">${result}</a>`);
}

function calculate(input) {
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

document.addEventListener("astro:page-load", init);
