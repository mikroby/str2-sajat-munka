let buttons = document.querySelectorAll(".button");
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.querySelector("body").setAttribute("style", `background: ${this.id}`);
    };
}