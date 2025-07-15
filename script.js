const characters = [
  // Resident Evil 0
  { name: "Rebecca Chambers", debut: "Resident Evil 0", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Billy Coen", debut: "Resident Evil 0", playable: true, faction: "Civilian", gender: "Male" },

  // Resident Evil (1996)
  { name: "Jill Valentine", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Chris Redfield", debut: "Resident Evil (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Barry Burton", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Albert Wesker", debut: "Resident Evil (1996)", playable: false, faction: "S.T.A.R.S.", gender: "Male" },

  // Resident Evil 2 (1998)
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: true, faction: "Unknown", gender: "Female" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },

  // Resident Evil 3 (1999)
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: true, faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Viktor", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, faction: "Umbrella", gender: "Male" },

  // Resident Evil Code: Veronica
  { name: "Steve Burnside", debut: "Resident Evil Code: Veronica", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code: Veronica", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code: Veronica", playable: false, faction: "Umbrella", gender: "Male" },

  // Resident Evil 4 (2005)
  { name: "Ashley Graham", debut: "Resident Evil 4", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Ramon Salazar", debut: "Resident Evil 4", playable: false, faction: "Los Iluminados", gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4", playable: false, faction: "Los Iluminados", gender: "Male" }
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
  currentCharacter = isDailyMode ? getDailyCharacter() : getRandomCharacter();
  guessInput.focus();
}

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function getDailyCharacter() {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4); // Convert to Eastern Time
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
    const parts = char.name.toLowerCase().split(" ");
    if (parts.some(part => part.startsWith(input))) {
      const option = document.createElement("option");
      option.value = char.name;
      dataList.appendChild(option);
    }
  });
}

function guessCharacter() {
  if (guesses >= maxGuesses) return;

  const inputVal = guessInput.value.trim().toLowerCase();
  const guess = characters.find(c => c.name.toLowerCase() === inputVal);
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
    setTimeout(() => alert(`You win! The character was ${currentCharacter.name}.`), 200);
  } else if (guesses === maxGuesses) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    setTimeout(() => alert(`You lose! The character was ${currentCharacter.name}.`), 200);
  }

  guessInput.value = "";
  filterDropdownOptions("");
}

function renderResultRow(guess) {
  const row = document.createElement("div");
  row.className = "result-row";

  const props = ["name", "debut", "playable", "faction", "gender"];
  props.forEach(prop => {
    const cell = document.createElement("div");
    cell.classList.add("result-box");

    const value = guess[prop];
    const actual = currentCharacter[prop];
    cell.textContent = (prop === "playable")
      ? (value ? "Yes" : "No")
      : value;

    if (value === actual) {
      cell.classList.add("correct");
    } else {
      cell.classList.add("incorrect");
    }

    row.appendChild(cell);
  });

  resultsDiv.appendChild(row);
}

playBtn.addEventListener("click", () => setMode("play"));
dailyBtn.addEventListener("click", () => setMode("daily"));
title.addEventListener("click", () => {
  homeScreen.style.display = "block";
  gameScreen.style.display = "none";
});

guessButton.addEventListener("click", guessCharacter);
guessInput.addEventListener("keypress", e => {
  if (e.key === "Enter") guessCharacter();
});
guessInput.addEventListener("input", e => filterDropdownOptions(e.target.value));
