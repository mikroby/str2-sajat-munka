const RATIO = 2.54;
document.querySelector("#calculator").addEventListener("submit", function (ev) {
    ev.preventDefault(); validate();
});
let results = document.querySelector("#results");

function validate() {
    let inches = parseFloat(document.querySelector("#inches").value);
    let feet = parseFloat(document.querySelector("#feet").value);

    if (isNaN(inches) || isNaN(feet) || inches < 0 || feet < 0) {
        results.innerHTML = "Enter values >= 0, please !";
        return;
    }

    calculate(inches, feet);
}

function calculate(inches, feet) {
    results.innerHTML = `${(feet * 12 + inches) * RATIO}`;
}