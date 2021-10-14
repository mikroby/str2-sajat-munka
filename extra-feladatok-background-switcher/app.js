function addClickEvent() {
    buttons = document.querySelectorAll(".button");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () { changeBgColor(this) };
    }
}

function changeBgColor(element) {
    let newColor = element.id;
    document.querySelector("body").setAttribute("style", `background: ${newColor}`);
}

addClickEvent();