const characters = [
  // RE1
  { name: "Chris Redfield", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil (1996)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },

  // RE2
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: true, faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "HUNK", debut: "Resident Evil 2 (1998)", playable: true, faction: "Umbrella", gender: "Male" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Brian Irons", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },

  // RE3
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: true, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Dario Rosso", debut: "Resident Evil 3 (1999)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, faction: "Umbrella", gender: "Male" },

  // RE0
  { name: "Billy Coen", debut: "Resident Evil 0", playable: true, faction: "Civilian", gender: "Male" },
  { name: "James Marcus", debut: "Resident Evil 0", playable: false, faction: "Umbrella", gender: "Male" },

  // RECV
  { name: "Steve Burnside", debut: "Resident Evil Code: Veronica", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code: Veronica", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code: Veronica", playable: false, faction: "Umbrella", gender: "Male" },

  // RE4
  { name: "Ashley Graham", debut: "Resident Evil 4 (2005)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ramón Salazar", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Ingrid Hunnigan", debut: "Resident Evil 4 (2005)", playable: false, faction: "Government", gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4 (2005)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Bitores Mendez", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4 (2005)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "The Merchant", debut: "Resident Evil 4 (2005)", playable: false, faction: "Unknown", gender: "Male" }
];

// === GAME MODE STATE ===
let currentCharacter = null;
let isDailyMode = false;
let dailyCharacter = null;
let usedDailyIndexes = JSON.parse(localStorage.getItem("usedDailyIndexes")) || [];

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

  let attempts = 0;
  while (usedDailyIndexes.includes(index) && attempts < characters.length) {
    index = (index + 1) % characters.length;
    attempts++;
  }

  dailyCharacter = characters[index];
  currentCharacter = dailyCharacter;

  if (!usedDailyIndexes.includes(index)) {
    usedDailyIndexes.push(index);
    if (usedDailyIndexes.length > 14) {
      usedDailyIndexes.shift();
    }
    localStorage.setItem("usedDailyIndexes", JSON.stringify(usedDailyIndexes));
  }
}

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

function wrapCell(value, answer) {
  const cls = value === answer ? "correct" : "incorrect";
  return `<span class="${cls}">${value}</span>`;
}

function updateGuessCounter() {
  if (guessCounter) {
    guessCounter.textContent = `${guessCount}/${MAX_GUESSES}`;
  }
}

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

guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", pickCharacter);
guessInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    guessCharacter();
  }
});

gameContainer.style.display = "none";
