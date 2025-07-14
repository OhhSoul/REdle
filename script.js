const characters = [
  { name: "Chris Redfield", debut: "Resident Evil", playable: "✅", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil", playable: "✅", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil", playable: "❌", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil", playable: "🔷", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil", playable: "❌", faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil", playable: "❌", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: "✅", faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: "✅", faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2", playable: "🔷", faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2", playable: "❌", faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2", playable: "❌", faction: "Civilian", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2", playable: "❌", faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2", playable: "❌", faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2", playable: "❌", faction: "Civilian", gender: "Male" },
  { name: "Carlos Oliveira", debut: "Resident Evil 3", playable: "✅", faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3", playable: "❌", faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3", playable: "❌", faction: "U.B.C.S.", gender: "Male" }
];

let currentCharacter = null;
let gameOver = false;

const input = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resultsDiv = document.getElementById("results");
const playAgainButton = document.getElementById("playAgain");
const autocompleteList = document.getElementById("autocomplete-list");
const legendToggle = document.getElementById("legendToggle");
const legendContent = document.getElementById("legend-content");

function pickCharacter() {
  do {
    currentCharacter = characters[Math.floor(Math.random() * characters.length)];
  } while (!currentCharacter);
  gameOver = false;
  clearResults();
  resetInput();
  closeAutocomplete();
}

function clearResults() {
  resultsDiv.innerHTML = "";
}

function resetInput() {
  input.value = "";
  input.disabled = false;
  guessButton.disabled = false;
  playAgainButton.style.display = "none";
}

function createResultTable(title, charObj, highlightObj) {
  const table = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = `<th colspan="2">${title}</th>`;
  table.appendChild(header);

  function addRow(label, value, highlightValue, isEmoji = false) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${label}</td>`;
    if (!isEmoji) {
      const cls = value === highlightValue ? "correct" : "incorrect";
      row.innerHTML += `<td class="${cls}">${value}</td>`;
    } else {
      let cls = "incorrect";
      if (value === highlightValue) cls = "correct";
      else if (value === "🔷" && highlightValue === "✅") cls = "partial";
      row.innerHTML += `<td class="${cls}">${value}</td>`;
    }
    table.appendChild(row);
  }

  addRow("Name", charObj.name, highlightObj.name);
  addRow("Debut", charObj.debut, highlightObj.debut);
  addRow("Playable", charObj.playable, highlightObj.playable, true);
  addRow("Faction", charObj.faction, highlightObj.faction);
  addRow("Gender", charObj.gender, highlightObj.gender);

  return table;
}

function displayResults(guess) {
  resultsDiv.innerHTML = "";
  const guessTable = createResultTable("Your Guess", guess, currentCharacter);
  const answerTable = createResultTable("Correct Answer", currentCharacter, currentCharacter);
  resultsDiv.appendChild(guessTable);
  resultsDiv.appendChild(answerTable);
}

function filterCharacters(inputValue) {
  if (!inputValue) return [];
  inputValue = inputValue.toLowerCase();
  return characters.filter(c => c.name.toLowerCase().includes(inputValue));
}

function closeAutocomplete() {
  autocompleteList.innerHTML = "";
}

function showAutocomplete(filtered) {
  closeAutocomplete();
  if (filtered.length === 0) return;

  filtered.forEach(c => {
    const item = document.createElement("div");
    item.textContent = c.name;
    item.addEventListener("click", () => {
      input.value = c.name;
      closeAutocomplete();
    });
    autocompleteList.appendChild(item);
  });
}

function handleInput() {
  if (gameOver) return;
  const val = input.value;
  if (!val) {
    closeAutocomplete();
    return;
  }
  const filtered = filterCharacters(val);
  showAutocomplete(filtered);
}

function handleGuess() {
  if (gameOver) return;

  const guessName = input.value.trim();
  if (!guessName) return alert("Please enter a character name.");

  // Find guess character (case insensitive)
  const guessChar = characters.find(
    c => c.name.toLowerCase() === guessName.toLowerCase()
  );

  if (!guessChar) {
    alert("No character found with that name.");
    return;
  }

  displayResults(guessChar);

  if (guessChar.name === currentCharacter.name) {
    alert("🎉 Correct! You guessed the character!");
    gameOver = true;
    input.disabled = true;
    guessButton.disabled = true;
    playAgainButton.style.display = "inline-block";
    closeAutocomplete();
  }
}

function setupEventListeners() {
  input.addEventListener("input", handleInput);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGuess();
      closeAutocomplete();
    }
  });

  guessButton.addEventListener("click", () => {
    handleGuess();
    closeAutocomplete();
  });

  playAgainButton.addEventListener("click", () => {
    pickCharacter();
  });

  legendToggle.addEventListener("click", () => {
    if (legendContent.style.display === "none") {
      legendContent.style.display = "block";
    } else {
      legendContent.style.display = "none";
    }
  });

  // Close autocomplete if click outside
  document.addEventListener("click", (e) => {
    if (!autocompleteList.contains(e.target) && e.target !== input) {
      closeAutocomplete();
    }
  });
}

// Initialize game
pickCharacter();
setupEventListeners();
