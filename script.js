// ========== CHARACTER DATA ==========
const characters = [
  { name: "Chris Redfield", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil (1996)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: true, faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: true, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "HUNK", debut: "Resident Evil 2 (1998)", playable: true, faction: "Umbrella", gender: "Male" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Female" },
  { name: "Brian Irons", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Dario Rosso", debut: "Resident Evil 3 (1999)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Billy Coen", debut: "Resident Evil Zero", playable: true, faction: "Civilian", gender: "Male" },
  { name: "James Marcus", debut: "Resident Evil Zero", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Steve Burnside", debut: "Resident Evil Code Veronica", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Ashley Graham", debut: "Resident Evil 4 (2005)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ramon Salazar", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Ingrid Hunnigan", debut: "Resident Evil 4 (2005)", playable: false, faction: "U.S. Government", gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4 (2005)", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Bitores Mendez", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Illuminados", gender: "Male" },
  { name: "Merchant", debut: "Resident Evil 4 (2005)", playable: false, faction: "Neutral", gender: "Male" }
];

// ========== DAILY CHARACTER SEEDING ==========
function getEasternTimeDateKey() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const easternOffset = -4 * 60; // EDT
  const eastern = new Date(utc + 60000 * easternOffset);
  return eastern.toISOString().split("T")[0];
}

function seededRandom(seed) {
  let x = Math.sin(seed.length) * 10000;
  return x - Math.floor(x);
}

function getDailyCharacter() {
  const dateKey = getEasternTimeDateKey();
  const index = Math.floor(seededRandom(dateKey) * characters.length);
  return characters[index];
}

// ========== GAME LOGIC ==========
let currentCharacter = null;
let guesses = [];
let maxGuesses = 8;
let isDaily = false;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resultsDiv = document.getElementById("results");
const playAgainButton = document.getElementById("playAgain");
const charactersList = document.getElementById("charactersList");
const guessCounter = document.getElementById("guessCounter");
const title = document.getElementById("title");
const dailyButton = document.getElementById("dailyButton");
const playButton = document.getElementById("playButton");
const homeDiv = document.getElementById("home");
const gameDiv = document.getElementById("game");

function startGame(mode) {
  isDaily = mode === "daily";
  homeDiv.style.display = "none";
  gameDiv.style.display = "block";

  currentCharacter = isDaily ? getDailyCharacter() : pickRandomCharacter();
  guesses = [];
  resultsDiv.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.style.display = "none";
  updateCounter();
  guessInput.focus();
}

dailyButton.addEventListener("click", () => startGame("daily"));
playButton.addEventListener("click", () => startGame("play"));
title.addEventListener("click", () => {
  homeDiv.style.display = "block";
  gameDiv.style.display = "none";
});

function pickRandomCharacter() {
  let newChar;
  do {
    newChar = characters[Math.floor(Math.random() * characters.length)];
  } while (newChar === currentCharacter);
  return newChar;
}

function updateCounter() {
  guessCounter.textContent = `${guesses.length}/${maxGuesses}`;
}

function displayResults(guess) {
  const table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `
    <tr>
      <th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th>
    </tr>
  `;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${guess.name}</td>
    <td class="${getMatchClass(guess.debut, currentCharacter.debut)}">${guess.debut}</td>
    <td class="${getMatchClass(guess.playable, currentCharacter.playable)}">${guess.playable ? "Yes" : "No"}</td>
    <td class="${getMatchClass(guess.faction, currentCharacter.faction)}">${guess.faction}</td>
    <td class="${getMatchClass(guess.gender, currentCharacter.gender)}">${guess.gender}</td>
  `;

  table.appendChild(row);
  resultsDiv.appendChild(table);
}

function getMatchClass(a, b) {
  return a === b ? "correct" : "incorrect";
}

function guessCharacter() {
  const input = guessInput.value.trim().toLowerCase();
  if (!input || guesses.length >= maxGuesses) return;

  const match = characters.find(c =>
    c.name.toLowerCase() === input ||
    c.name.toLowerCase().split(" ").some(part => part === input)
  );

  if (!match) {
    alert("Character not found.");
    return;
  }

  guesses.push(match);
  displayResults(match);
  updateCounter();
  guessInput.value = "";

  if (match.name === currentCharacter.name) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    resultsDiv.innerHTML += `<h2 class='result-message win'>You Win!</h2>`;
    playAgainButton.style.display = isDaily ? "none" : "block";
  } else if (guesses.length >= maxGuesses) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    resultsDiv.innerHTML += `<h2 class='result-message lose'>You Lose! The answer was ${currentCharacter.name}</h2>`;
    playAgainButton.style.display = isDaily ? "none" : "block";
  }
}

function filterDropdownOptions(value) {
  const input = value.trim().toLowerCase();
  charactersList.innerHTML = "";
  if (!input) return;
  characters.forEach(char => {
    const parts = char.name.toLowerCase().split(" ");
    if (parts.some(p => p.startsWith(input))) {
      const option = document.createElement("option");
      option.value = char.name;
      charactersList.appendChild(option);
    }
  });
}

guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", () => startGame("play"));
guessInput.addEventListener("input", e => filterDropdownOptions(e.target.value));
guessInput.addEventListener("keypress", e => {
  if (e.key === "Enter") guessCharacter();
});
