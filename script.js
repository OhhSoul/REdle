const characters = [
  // Resident Evil 0
  { name: "Rebecca Chambers", games: ["Resident Evil 0", "Resident Evil (1996)"], playable: true, gender: "Female" },
  { name: "Billy Coen", games: ["Resident Evil 0"], playable: true, gender: "Male" },
  { name: "James Marcus", games: ["Resident Evil 0"], playable: false, gender: "Male" },

  // Resident Evil (1996)
  { name: "Jill Valentine", games: ["Resident Evil (1996)", "Resident Evil 3 (1999)"], playable: true, gender: "Female" },
  { name: "Chris Redfield", games: ["Resident Evil (1996)", "Resident Evil Code: Veronica"], playable: true, gender: "Male" },
  { name: "Barry Burton", games: ["Resident Evil (1996)", "Resident Evil 3 (1999)"], playable: false, gender: "Male" },
  { name: "Albert Wesker", games: ["Resident Evil (1996)", "Resident Evil Code: Veronica", "Resident Evil 0", "Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Brad Vickers", games: ["Resident Evil (1996)", "Resident Evil 3 (1999)"], playable: false, gender: "Male" },

  // Resident Evil 2 (1998)
  { name: "Leon Kennedy", games: ["Resident Evil 2 (1998)", "Resident Evil 4"], playable: true, gender: "Male" },
  { name: "Claire Redfield", games: ["Resident Evil 2 (1998)", "Resident Evil Code: Veronica"], playable: true, gender: "Female" },
  { name: "Ada Wong", games: ["Resident Evil 2 (1998)", "Resident Evil 4"], playable: true, gender: "Female" },
  { name: "Sherry Birkin", games: ["Resident Evil 2 (1998)"], playable: true, gender: "Female" },
  { name: "Mr. X", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Male" },
  { name: "Marvin Branagh", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Male" },
  { name: "Robert Kendo", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Male" },
  { name: "Brian Irons", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Male" },
  { name: "Ben Bertolucci", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Male" },
  { name: "Annette Birkin", games: ["Resident Evil 2 (1998)"], playable: false, gender: "Female" },
  { name: "William Birkin", games: ["Resident Evil 2 (1998)", "Resident Evil 0"], playable: false, gender: "Male" },
  { name: "HUNK", games: ["Resident Evil 2 (1998)"], playable: true, gender: "Male" },

  // Resident Evil 3 (1999)
  { name: "Carlos Oliveira", games: ["Resident Evil 3 (1999)"], playable: true, gender: "Male" },
  { name: "Mikhail Viktor", games: ["Resident Evil 3 (1999)"], playable: false, gender: "Male" },
  { name: "Nicholai Ginovaef", games: ["Resident Evil 3 (1999)"], playable: false, gender: "Male" },
  { name: "Nemesis", games: ["Resident Evil 3 (1999)"], playable: false, gender: "Male" },
  { name: "Dario Rosso", games: ["Resident Evil 3 (1999)"], playable: false, gender: "Male" },
  { name: "Tyrell Patrick", games: ["Resident Evil 3 (1999)"], playable: false, gender: "Male" },

  // Resident Evil Code: Veronica
  { name: "Steve Burnside", games: ["Resident Evil Code: Veronica"], playable: true, gender: "Male" },
  { name: "Alexia Ashford", games: ["Resident Evil Code: Veronica"], playable: false, gender: "Female" },
  { name: "Alfred Ashford", games: ["Resident Evil Code: Veronica"], playable: false, gender: "Male" },

  // Resident Evil 4 (2005)
  { name: "Ashley Graham", games: ["Resident Evil 4"], playable: true, gender: "Female" },
  { name: "Luis Sera", games: ["Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Jack Krauser", games: ["Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Ramon Salazar", games: ["Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Osmund Saddler", games: ["Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Ingrid Hunnigan", games: ["Resident Evil 4"], playable: false, gender: "Female" },
  { name: "Bitores Mendez", games: ["Resident Evil 4"], playable: false, gender: "Male" },
  { name: "Merchant", games: ["Resident Evil 4"], playable: false, gender: "Male" },

  // Resident Evil Outbreak
  { name: "Kevin Ryman", games: ["Resident Evil Outbreak"], playable: true, gender: "Male" },
  { name: "George Hamilton", games: ["Resident Evil Outbreak"], playable: true, gender: "Male" },
  { name: "David King", games: ["Resident Evil Outbreak"], playable: true, gender: "Male" },
  { name: "Alyssa Ashcroft", games: ["Resident Evil Outbreak"], playable: true, gender: "Female" },
  { name: "Mark Wilkins", games: ["Resident Evil Outbreak"], playable: true, gender: "Male" },
  { name: "Jim Chapman", games: ["Resident Evil Outbreak"], playable: true, gender: "Male" },
  { name: "Yoko Suzuki", games: ["Resident Evil Outbreak"], playable: true, gender: "Female" },
  { name: "Cindy Lennox", games: ["Resident Evil Outbreak"], playable: true, gender: "Female" }
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
  now.setUTCHours(now.getUTCHours() - 4);
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
    const [first, last] = char.name.toLowerCase().split(" ");
    if (first.startsWith(input) || (last && last.startsWith(input))) {
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

  const labels = ["Name", "Games Appeared In", "Playable", "Gender"];
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

  // Name
  const nameCell = document.createElement("div");
  nameCell.className = "result-box";
  nameCell.textContent = guess.name;
  if (guess.name === currentCharacter.name) {
    nameCell.classList.add("match");
  } else {
    nameCell.classList.add("wrong");
  }
  row.appendChild(nameCell);

  // Games
  const gamesCell = document.createElement("div");
  gamesCell.className = "result-box";
  gamesCell.textContent = guess.games.join(", ");
  const sharedGames = guess.games.filter(game => currentCharacter.games.includes(game));
  if (guess.games.join() === currentCharacter.games.join()) {
    gamesCell.classList.add("match");
  } else if (sharedGames.length > 0) {
    gamesCell.classList.add("partial");
  } else {
    gamesCell.classList.add("wrong");
  }
  row.appendChild(gamesCell);

  // Playable
  const playableCell = document.createElement("div");
  playableCell.className = "result-box";
  playableCell.textContent = guess.playable ? "Yes" : "No";
  if (guess.playable === currentCharacter.playable) {
    playableCell.classList.add("match");
  } else {
    playableCell.classList.add("wrong");
  }
  row.appendChild(playableCell);

  // Gender
  const genderCell = document.createElement("div");
  genderCell.className = "result-box";
  genderCell.textContent = guess.gender;
  if (guess.gender === currentCharacter.gender) {
    genderCell.classList.add("match");
  } else {
    genderCell.classList.add("wrong");
  }
  row.appendChild(genderCell);

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
