let startTime;
let timerInterval;

<!DOCTYPE html> 
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puzzel Codex</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Voer de juiste codes in</h1>
        <p>Voer de vier cijfers in om het bijbehorende woord te onthullen.</p>
        
        <div id="code-inputs">
            <input type="text" maxlength="4" id="code1">
            <input type="text" maxlength="4" id="code2">
            <input type="text" maxlength="4" id="code3">
            <input type="text" maxlength="4" id="code4">
            <input type="text" maxlength="4" id="code5">
            <input type="text" maxlength="4" id="code6">
            <input type="text" maxlength="4" id="code7">
            <input type="text" maxlength="4" id="code8">
            <input type="text" maxlength="4" id="code9">
            <input type="text" maxlength="4" id="code10">
            <input type="text" maxlength="4" id="code11">
        </div>

        <button onclick="checkCodes()">Controleer</button>
        <p id="output"></p>
    </div>

    <script>
        const correctCodes = {
            "3725": "hou",
            "8146": "ik",
            "5927": "helemaal",
            "6318": "maan",
            "2594": "terug",
            "7361": "tot",
            "4852": "aan",
            "9736": "je",
            "1684": "de",
            "5297": "en",
            "3861": "terug"
        };

        function checkCodes() {
            let output = "";
            for (let i = 1; i <= 11; i++) {
                let userInput = document.getElementById(`code${i}`).value;
                if (correctCodes[userInput]) {
                    output += correctCodes[userInput] + " ";
                } else {
                    output += "???? ";
                }
            }
            document.getElementById("output").textContent = output;
        }
    </script>
</body>
</html>;

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
