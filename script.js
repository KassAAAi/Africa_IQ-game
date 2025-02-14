let startTime;
let timerInterval;

const correctCoordinates = {
    "1234": "ik",
    "5678": "hou",
    "9101": "helemaal",
    "1121": "maan",
    "3141": "terug",
    "5161": "tot",
    "7181": "aan",
    "9202": "je",
    "1222": "de",
    "3242": "en",
    "5262": "terug"
};

// Start de timer zodra de pagina wordt geladen
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Update de timer weergave
function updateTimer() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    let seconds = String(elapsedTime % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `${minutes}:${seconds}`;
}

// Stop de timer als de speler de juiste code invoert
function stopTimer() {
    clearInterval(timerInterval);
}

function createFields() {
    const coordinateContainer = document.getElementById("coordinate-fields");
    const codexContainer = document.getElementById("codex-fields");

    for (let i = 0; i < 11; i++) {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "4");
        input.dataset.index = i;
        input.addEventListener("input", checkCoordinate);
        coordinateContainer.appendChild(input);
    }

    for (let i = 0; i < 11; i++) {
        let codexInput = document.createElement("input");
        codexInput.setAttribute("type", "text");
        codexInput.setAttribute("maxlength", "1");
        codexInput.dataset.index = i;
        codexContainer.appendChild(codexInput);
    }
}

function checkCoordinate(event) {
    let input = event.target;
    let value = input.value;

    if (correctCoordinates[value]) {
        input.style.backgroundColor = "lightgreen";
        document.getElementById("generator-output").innerText = correctCoordinates[value];
    } else {
        input.style.backgroundColor = "lightcoral";
    }
}

function checkCodex() {
    let codexInputFields = document.querySelectorAll("#codex-fields input");
    let correctCode = "IHTMATYJDTT"; // 1e letter van juiste zin: Ik hou tot aan de maan en weer terug
    let userCode = Array.from(codexInputFields).map(input => input.value.toUpperCase()).join("");

    if (userCode === correctCode) {
        document.getElementById("codex-output").innerText = "De codex opent! Je hebt de schat gevonden!";
        stopTimer(); // Timer stoppen zodra de code goed is
    } else {
        document.getElementById("codex-output").innerText = "Onjuiste code, probeer opnieuw!";
    }
}

// Start de timer zodra de pagina geladen is
document.addEventListener("DOMContentLoaded", function() {
    createFields();
    startTimer();
});
