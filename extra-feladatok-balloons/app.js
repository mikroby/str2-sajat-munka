let numberOfBalloons;

function addMouseEvent() {
    let balloons = document.querySelectorAll(".balloon");

    numberOfBalloons = balloons.length;

    for (i = 0; i < numberOfBalloons; i++) {
        balloons[i].onmouseover = function () { popThat(this) };
    }
}

function popThat(element) {
    element.onmouseover = null;
    element.setAttribute("style", "background: #ededed");
    element.innerHTML = "POP!";

    numberOfBalloons--;

    if (numberOfBalloons == 0) {
        document.querySelector("#yay-no-balloons").setAttribute("style", "display: block");
    }
}

addMouseEvent();