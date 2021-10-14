let balloons = document.querySelectorAll(".balloon");
let numberOfBalloons = balloons.length;

for (i = 0; i < numberOfBalloons; i++) {
    balloons[i].onmouseover = pop;
}

function pop() {
    this.onmouseover = null;
    this.setAttribute("style", "background: #ededed");
    this.innerHTML = "POP!";

    numberOfBalloons--;

    if (numberOfBalloons == 0) {
        document.querySelector("#yay-no-balloons").setAttribute("style", "display: block");
    }
}