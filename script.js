const characters = [
  { name: "Chris Redfield", debut: "Resident Evil 1 (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil 1 (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil 1 (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil 1 (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil 1 (1996)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil 1 (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: true, faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "HUNK", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Female" },
  { name: "Brian Irons", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: true, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Dario Rosso", debut: "Resident Evil 3 (1999)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Billy Coen", debut: "Resident Evil 0", playable: true, faction: "Civilian", gender: "Male" },
  { name: "James Marcus", debut: "Resident Evil 0", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Steve Burnside", debut: "Resident Evil Code Veronica", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Ashley Graham", debut: "Resident Evil 4 (2005)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ramon Salazar", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Ingrid Hunnigan", debut: "Resident Evil 4 (2005)", playable: false, faction: "Government", gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Bitores Mendez", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Merchant", debut: "Resident Evil 4 (2005)", playable: false, faction: "Neutral", gender: "Male" }
];

// Daily feature logic
function getDailyCharacter() {
  const easternOffset = -5 * 60; // EST in minutes
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const estTime = new Date(utc + 60000 * easternOffset);
  const daySeed = estTime.toISOString().split('T')[0];

  let hash = 0;
  for (let i = 0; i < daySeed.length; i++) {
    hash = daySeed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % characters.length;
  return characters[index];
}

let currentCharacter = null;
let guessCount = 0;
const maxGuesses = 8;
let isDaily = false;
let hasGuessedDaily = false;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgain");
const resultsDiv = document.getElementById("results");
const guessCounter = document.getElementById("guessCounter");
const modeSelector = document.getElementById("modeSelector");
const gameContainer = document.getElementById("game");
const charactersList = document.getElementById("charactersList");

function pickCharacter() {
  let newChar;
  do {
    newChar = characters[Math.floor(Math.random() * characters.length)];
  } while (newChar === currentCharacter);
  currentCharacter = newChar;
  clearGame();
}

function startDailyMode() {
  currentCharacter = getDailyCharacter();
  isDaily = true;
  clearGame();
  const lastPlayed = localStorage.getItem("lastDaily");
  const today = new Date().toISOString().split("T")[0];
  if (lastPlayed === today) {
    hasGuessedDaily = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    guessCounter.textContent = "Come back tomorrow for a new daily!";
  } else {
    hasGuessedDaily = false;
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
  document.getElementById("endMessage")?.remove();
}

function updateGuessCounter() {
  if (!isDaily || (isDaily && !hasGuessedDaily)) {
    guessCounter.textContent = `${guessCount}/${maxGuesses}`;
  }
}

function createCell(value, isCorrect) {
  const cell = document.createElement("td");
  cell.textContent = value;
  cell.className = isCorrect ? "correct-cell" : "incorrect-cell";
  return cell;
}

function displayResults(guess) {
  const table = document.createElement("table");
  table.className = "table";

  const headerRow = document.createElement("tr");
  ["Name", "Debut", "Playable", "Faction", "Gender"].forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  const row = document.createElement("tr");
  row.appendChild(document.createElement("td")).textContent = guess.name;
  row.appendChild(createCell(guess.debut, guess.debut === currentCharacter.debut));
  row.appendChild(createCell(guess.playable ? "Yes" : "No", guess.playable === currentCharacter.playable));
  row.appendChild(createCell(guess.faction, guess.faction === currentCharacter.faction));
  row.appendChild(createCell(guess.gender, guess.gender === currentCharacter.gender));
  table.appendChild(row);

  resultsDiv.appendChild(table);
}

function endGame(won) {
  const msg = document.createElement("div");
  msg.id = "endMessage";
  msg.textContent = won ? `You win! The answer was ${currentCharacter.name}.` : `You lose! The answer was ${currentCharacter.name}.`;
  resultsDiv.appendChild(msg);
  guessInput.disabled = true;
  guessButton.disabled = true;
  if (!isDaily) playAgainButton.style.display = "inline-block";
  if (isDaily && !hasGuessedDaily) {
    localStorage.setItem("lastDaily", new Date().toISOString().split("T")[0]);
    hasGuessedDaily = true;
  }
}

function guessCharacter() {
  const inputVal = guessInput.value.trim().toLowerCase();
  const guess = characters.find(c => c.name.toLowerCase() === inputVal);
  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  displayResults(guess);
  guessCount++;
  updateGuessCounter();

  if (guess.name === currentCharacter.name) {
    endGame(true);
  } else if (guessCount >= maxGuesses) {
    endGame(false);
  }

  guessInput.value = "";
  guessInput.focus();
}

// Event Listeners
guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", () => {
  isDaily = false;
  pickCharacter();
});
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    guessCharacter();
  }
});
document.getElementById("playButton").addEventListener("click", () => {
  modeSelector.style.display = "none";
  gameContainer.style.display = "block";
  isDaily = false;
  pickCharacter();
});
document.getElementById("dailyButton").addEventListener("click", () => {
  modeSelector.style.display = "none";
  gameContainer.style.display = "block";
  startDailyMode();
});
document.getElementById("title").addEventListener("click", () => {
  gameContainer.style.display = "none";
  modeSelector.style.display = "block";
  isDaily = false;
  clearGame();
});
