const characters = [
  // Resident Evil 0
  { name: "Rebecca Chambers", debut: "Resident Evil 0", playable: true, gender: "Female" },
  { name: "Billy Coen", debut: "Resident Evil 0", playable: true, gender: "Male" },

  // Resident Evil (1996)
  { name: "Jill Valentine", debut: "Resident Evil (1996)", playable: true, gender: "Female" },
  { name: "Chris Redfield", debut: "Resident Evil (1996)", playable: true, gender: "Male" },
  { name: "Barry Burton", debut: "Resident Evil (1996)", playable: false, gender: "Male" },
  { name: "Albert Wesker", debut: "Resident Evil (1996)", playable: false, gender: "Male" },

  // Resident Evil 2 (1998)
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: true, gender: "Female" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: true, gender: "Female" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, gender: "Male" },

  // Resident Evil 3 (1999)
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: true, gender: "Male" },
  { name: "Mikhail Viktor", debut: "Resident Evil 3 (1999)", playable: false, gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: false, gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, gender: "Male" },

  // Resident Evil Code: Veronica
  { name: "Steve Burnside", debut: "Resident Evil Code: Veronica", playable: true, gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code: Veronica", playable: false, gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code: Veronica", playable: false, gender: "Male" },

  // Resident Evil 4 (2005)
  { name: "Ashley Graham", debut: "Resident Evil 4", playable: true, gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4", playable: false, gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4", playable: false, gender: "Male" },
  { name: "Ramon Salazar", debut: "Resident Evil 4", playable: false, gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4", playable: false, gender: "Male" }
];

let currentCharacter = null;
let guesses = 0;
const maxGuesses = 8;
let isDailyMode = false;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resultsDiv = document.getElementById("results");
const guessCounter = document.getElementById("guessCounter");
const playBtn = document.getElementById("playBtn");
const dailyBtn = document.getElementById("dailyBtn");
const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const title = document.getElementById("title");
const messageBox = document.getElementById("gameMessage");
const playAgainBtn = document.getElementById("playAgainBtn");

function setMode(mode) {
  isDailyMode = mode === "daily";
  homeScreen.style.display = "none";
  gameScreen.style.display = "block";
  guesses = 0;
  guessCounter.textContent = `0 / ${maxGuesses}`;
  resultsDiv.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  messageBox.textContent = "";
  playAgainBtn.style.display = isDailyMode ? "none" : "none";

  currentCharacter = isDailyMode ? getDailyCharacter() : getRandomCharacter();
  renderHeaderRow();

  if (isDailyMode) {
    const dailyKey = getTodayKey();
    const result = localStorage.getItem(dailyKey);
    if (result === "win") {
      showMessage(true);
      guessInput.disabled = true;
      guessButton.disabled = true;
    } else if (result === "lose") {
      showMessage(false);
      guessInput.disabled = true;
      guessButton.disabled = true;
    }
  }

  guessInput.focus();
}

function getTodayKey() {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4);
  return `dailyResult_${now.toISOString().split("T")[0]}`;
}

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function getDailyCharacter() {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4); // Eastern Time
  const seed = now.toISOString().split("T")[0];
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return characters[hash % characters.length];
}

function filterDropdownOptions(value) {
  const input = value.trim().toLowerCase();
  const dataList = document.getElementById("charactersList");
  dataList.innerHTML = "";
  if (input.length === 0) return;

  characters.forEach(char => {
    if (char.name.toLowerCase().includes(input)) {
      const option = document.createElement("option");
      option.value = char.name;
      dataList.appendChild(option);
    }
  });
}

function matchCharacter(inputVal) {
  const lowerInput = inputVal.trim().toLowerCase();
  return characters.find(c => {
    const fullName = c.name.toLowerCase();
    const parts = fullName.split(" ");
    return fullName === lowerInput || parts.includes(lowerInput);
  });
}

function guessCharacter() {
  if (guesses >= maxGuesses) return;

  const inputVal = guessInput.value;
  const guess = matchCharacter(inputVal);
  if (!guess) {
    alert("Character not found.");
    return;
  }

  guesses++;
  guessCounter.textContent = `${guesses} / ${maxGuesses}`;
  renderResultRow(guess);

  if (guess.name === currentCharacter.name) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    showMessage(true);
    if (!isDailyMode) playAgainBtn.style.display = "inline-block";
    if (isDailyMode) localStorage.setItem(getTodayKey(), "win");
  } else if (guesses === maxGuesses) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    showMessage(false);
    if (!isDailyMode) playAgainBtn.style.display = "inline-block";
    if (isDailyMode) localStorage.setItem(getTodayKey(), "lose");
  }

  guessInput.value = "";
  filterDropdownOptions("");
}

function showMessage(win) {
  messageBox.textContent = win
    ? `✅ You win! The character was ${currentCharacter.name}.`
    : `❌ You lose! The character was ${currentCharacter.name}.`;
}

function renderHeaderRow() {
  const header = document.createElement("div");
  header.className = "result-row";

  const labels = ["Name", "Game", "Playable", "Gender"];
  labels.forEach(label => {
    const cell = document.createElement("div");
    cell.className = "result-box";
    cell.textContent = label;
    cell.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    cell.style.fontWeight = "bold";
    header.appendChild(cell);
  });

  resultsDiv.appendChild(header);
}

function renderResultRow(guess) {
  const row = document.createElement("div");
  row.className = "result-row";

  const props = ["name", "debut", "playable", "gender"];
  props.forEach(prop => {
    const cell = document.createElement("div");
    cell.classList.add("result-box");

    const value = guess[prop];
    const actual = currentCharacter[prop];

    cell.textContent = prop === "playable" ? (value ? "Yes" : "No") : value;

    if (value === actual) {
      cell.classList.add("match");
    } else {
      cell.classList.add("wrong");
    }

    row.appendChild(cell);
  });

  resultsDiv.appendChild(row);
}

playBtn.addEventListener("click", () => setMode("play"));
dailyBtn.addEventListener("click", () => setMode("daily"));
playAgainBtn.addEventListener("click", () => setMode("play"));

title.addEventListener("click", (e) => {
  if (e.target.id === "title") {
    homeScreen.style.display = "block";
    gameScreen.style.display = "none";
  }
});

guessButton.addEventListener("click", guessCharacter);
guessInput.addEventListener("keypress", e => {
  if (e.key === "Enter") guessCharacter();
});
guessInput.addEventListener("input", e => filterDropdownOptions(e.target.value));
