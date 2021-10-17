function validate() {
    const name = document.querySelector('form input[name="fullName"]').value;
    const email = document.querySelector('form input[name="email"]').value;
    const message = document.querySelector('form textarea[name="message"]').value;

    let result = true;

    if (!validateName(name)) {
        alert("A név legalább 5 karakter hosszúságú legyen, és nem lehet benne szám sem !");
        result = false;
    } else {
        if (!validateEmail(email)) {
            alert("Az email nem felel meg a formátumnak !");
            result = false;
        } else {
            if (!validateMessage(message)) {
                alert("Az üzenet legalább 20 karakter hosszúságú legyen !");
                result = false;
            }
        }
    }

    return result;
}

function validateName(name) {
    const pattern = new RegExp('[0-9]');
    if (name.length < 5 || pattern.test(name)) {
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {
    const at = email.indexOf('@');
    return email.includes('.', at) > 0 ? true : false;
}

function validateMessage(message) {
    return message.length >= 20 ? true : false;
}