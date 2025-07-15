const characters = [
  // [... YOUR FULL CHARACTER LIST ...]
  // (For brevity here, use the updated character list we finalized earlier)
];

// === GAME MODE STATE ===
let currentCharacter = null;
let isDailyMode = false;
let dailyCharacter = null;
let usedDailyIndexes = JSON.parse(localStorage.getItem("usedDailyIndexes")) || [];

// === DOM Elements ===
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgain");
const resultsDiv = document.getElementById("results");
const charactersList = document.getElementById("charactersList");
const modeSelector = document.getElementById("modeSelector");
const gameContainer = document.getElementById("game");
const guessCounter = document.getElementById("guessCounter");

let guessCount = 0;
const MAX_GUESSES = 8;

// === MODE SWITCHING ===
document.getElementById("dailyButton").addEventListener("click", () => {
  isDailyMode = true;
  startGame();
});
document.getElementById("playButton").addEventListener("click", () => {
  isDailyMode = false;
  startGame();
});

function startGame() {
  modeSelector.style.display = "none";
  gameContainer.style.display = "block";
  pickCharacter();
}

// === CHARACTER PICKING ===
function pickCharacter() {
  if (isDailyMode) {
    pickDailyCharacter();
  } else {
    let newChar;
    do {
      newChar = characters[Math.floor(Math.random() * characters.length)];
    } while (newChar === currentCharacter);
    currentCharacter = newChar;
  }
  clearGame();
}

function pickDailyCharacter() {
  const todayET = getEasternDateString();
  const seed = hashString(todayET);
  let index = seed % characters.length;

  // Avoid recent daily characters
  let attempts = 0;
  while (usedDailyIndexes.includes(index) && attempts < characters.length) {
    index = (index + 1) % characters.length;
    attempts++;
  }

  dailyCharacter = characters[index];
  currentCharacter = dailyCharacter;

  // Add to used list
  if (!usedDailyIndexes.includes(index)) {
    usedDailyIndexes.push(index);
    if (usedDailyIndexes.length > 14) {
      usedDailyIndexes.shift();
    }
    localStorage.setItem("usedDailyIndexes", JSON.stringify(usedDailyIndexes));
  }
}

// === GAME CLEAR / RESET ===
function clearGame() {
  resultsDiv.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.style.display = "none";
  guessCount = 0;
  updateGuessCounter();
  guessInput.focus();
}

// === GUESS PROCESSING ===
function guessCharacter() {
  const inputVal = guessInput.value.trim().toLowerCase();
  if (!inputVal) return;

  const guess = characters.find(c =>
    c.name.toLowerCase() === inputVal ||
    c.name.toLowerCase().split(" ").some(part => part === inputVal)
  );

  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  displayResults(guess);
  guessCount++;
  updateGuessCounter();

  if (guess.name === currentCharacter.name || guessCount >= MAX_GUESSES) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.style.display = isDailyMode ? "none" : "inline-block";
  }
}

// === RESULT DISPLAY ===
function displayResults(guess) {
  const table = document.createElement("table");
  table.className = "table";

  const header = document.createElement("tr");
  header.innerHTML = `
    <th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th>
  `;
  table.appendChild(header);

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${guess.name}</td>
    <td>${wrapCell(guess.debut, currentCharacter.debut)}</td>
    <td>${wrapCell(guess.playable ? "Yes" : "No", currentCharacter.playable ? "Yes" : "No")}</td>
    <td>${wrapCell(guess.faction, currentCharacter.faction)}</td>
    <td>${wrapCell(guess.gender, currentCharacter.gender)}</td>
  `;
  table.appendChild(row);
  resultsDiv.appendChild(table);
}

// === STYLING HELPERS ===
function wrapCell(value, answer) {
  let cls = value === answer ? "correct" : "incorrect";
  return `<span class="${cls}">${value}</span>`;
}

function updateGuessCounter() {
  if (guessCounter) {
    guessCounter.textContent = `${guessCount}/${MAX_GUESSES}`;
  }
}

// === AUTOCOMPLETE ===
guessInput.addEventListener("input", e => filterDropdownOptions(e.target.value));
function filterDropdownOptions(value) {
  const input = value.trim().toLowerCase();
  charactersList.innerHTML = "";

  if (!input) return;

  characters.forEach(char => {
    const parts = char.name.toLowerCase().split(" ");
    if (parts.some(part => part.startsWith(input))) {
      const option = document.createElement("option");
      option.value = char.name;
      charactersList.appendChild(option);
    }
  });
}

// === UTILITIES ===
function getEasternDateString() {
  const nowUTC = new Date();
  const nowET = new Date(nowUTC.toLocaleString("en-US", { timeZone: "America/New_York" }));
  return nowET.toISOString().split("T")[0];
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// === EVENTS ===
guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", pickCharacter);
guessInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    guessCharacter();
  }
});

// === INIT ===
gameContainer.style.display = "none";
