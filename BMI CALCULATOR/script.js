const BMIData = [
    { name: "Slim", color: "midnightblue", range: [0, 18.5] },
    { name: "Good Health", color: "green", range: [18.5, 25] },
    { name: "Hyper Weight", color: "lightcoral", range: [25, 30] },
    { name: "Modered Obesity", color: "orange", range: [30, 35] },
    { name: "Severe Obesity", color: "crimson", range: [35, 40] },
    { name: "Morbid Obesity", color: "purple", range: [40, 80] },
];

const form = document.querySelector("form");
form.addEventListener("submit", handleForm);

const inputs = document.querySelectorAll("input");
const captchaInput = document.getElementById("submit");

function handleForm(e) {
    e.preventDefault();
    const captchaValue = captchaInput.value.trim();

    if (captchaValue === "") {
        alert("Please enter the captcha.");
        return;
    }

    calculateBMI();
}

function calculateBMI() {
    const height = parseFloat(inputs[0].value);
    const weight = parseFloat(inputs[1].value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        handleError();
        return;
    }

    const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);
    showResult(BMI);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

function handleError() {
    displayBMI.textContent = "Oops!";
    displayBMI.style.color = "inherit";
    result.textContent = "Fill in the fields correctly";
}

function showResult(BMI) {
    const rank = BMIData.find((data) => {
        if (BMI >= data.range[0] && BMI < data.range[1]) {
            return data;
        } else if (typeof data.range === "number" && BMI >= data.range) {
            return data;
        }
    });

    displayBMI.textContent = `Your BMI: ${BMI}`;
    displayBMI.style.color = rank.color;
    result.textContent = `Result: ${rank.name}`;
}

let captcha;

function generate() {
    captchaInput.value = "";
    captcha = document.getElementById("image");
    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.floor(Math.random() * randomchar.length));
    }
    captcha.innerHTML = uniquechar;
}

function printmsg() {
    const usr_input = captchaInput.value.trim();

    if (usr_input === captcha.innerHTML) {
        generate();
        alert("Matched");
    } else {
        generate();
        alert("Captcha is incorrect. Please try again.");
    }
}

// Initial captcha generation
generate();
