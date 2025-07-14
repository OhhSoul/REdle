const characters = [
  { name: "Chris Redfield", debut: "Resident Evil", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil", playable: false, faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: true, faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: true, faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2", playable: true, faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2", playable: false, faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2", playable: false, faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2", playable: false, faction: "Civilian", gender: "Male" },
  { name: "Carlos Oliveira", debut: "Resident Evil 3", playable: true, faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3", playable: false, faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3", playable: false, faction: "U.B.C.S.", gender: "Male" }
];

let currentCharacter = null;
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgain");
const resultsDiv = document.getElementById("results");
const charactersList = document.getElementById("charactersList");

// Pick a new character randomly (not same as last)
function pickCharacter() {
  let newChar;
  do {
    newChar = characters[Math.floor(Math.random() * characters.length)];
  } while (newChar === currentCharacter);
  currentCharacter = newChar;
  clearGame();
}

// Clear input, results, buttons for a new round
function clearGame() {
  resultsDiv.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.style.display = "none";
  guessInput.focus();
}

// Display results after a guess
function displayResults(guess) {
  resultsDiv.innerHTML = "";

  // Table headers
  const table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `
    <tr>
      <th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th>
    </tr>
  `;

  // Guessed character row (left side)
  const guessRow = document.createElement("tr");
  guessRow.innerHTML = `
    <td>${guess.name}</td>
    <td>${checkMatch(currentCharacter.debut, guess.debut)}</td>
    <td>${guess.playable ? 'Yes ✅' : 'No ❌'}</td>
    <td>${checkMatch(currentCharacter.faction, guess.faction)}</td>
    <td>${checkMatch(currentCharacter.gender, guess.gender)}</td>
  `;
  table.appendChild(guessRow);

  // If correct guess, show answer row below
  if (guess.name === currentCharacter.name) {
    const answerRow = document.createElement("tr");
    answerRow.style.fontWeight = "bold";
    answerRow.innerHTML = `
      <td><strong>Answer: ${currentCharacter.name}</strong></td>
      <td>${currentCharacter.debut}</td>
      <td>${currentCharacter.playable ? 'Yes ✅' : 'No ❌'}</td>
      <td>${currentCharacter.faction}</td>
      <td>${currentCharacter.gender}</td>
    `;
    table.appendChild(answerRow);
  }

  resultsDiv.appendChild(table);
}

// Check if guessed value matches the answer, return check or cross
function checkMatch(answerVal, guessVal) {
  return answerVal === guessVal ? '✔️' : '❌';
}

// Filter dropdown options based on input
function filterDropdownOptions(value) {
  const input = value.trim().toLowerCase();

  // Clear current options
  charactersList.innerHTML = "";

  if (input.length === 0) return;

  // Only add names whose first or last name starts with the input letter
  characters.forEach(char => {
    const parts = char.name.toLowerCase().split(" ");
    if (parts.some(part => part.startsWith(input))) {
      const option = document.createElement("option");
      option.value = char.name;
      charactersList.appendChild(option);
    }
  });
}

// Guess logic
function guessCharacter() {
  let inputVal = guessInput.value.trim().toLowerCase();

  if (!inputVal) return;

  // Find character by full name or partial first/last name (case-insensitive)
  let guess = characters.find(c =>
    c.name.toLowerCase() === inputVal ||
    c.name.toLowerCase().split(" ").some(part => part === inputVal)
  );

  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  displayResults(guess);

  // If correct guess
  if (guess.name === currentCharacter.name) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.style.display = "inline-block";
  }
}

// Toggle legend visibility
function toggleLegend() {
  const legendContent = document.getElementById("legend-content");
  legendContent.style.display = legendContent.style.display === "none" || legendContent.style.display === "" ? "block" : "none";
}

// Event Listeners
guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", () => {
  pickCharacter();
});

guessInput.addEventListener("input", (e) => {
  filterDropdownOptions(e.target.value);
});

guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form submit if any
    guessCharacter();
  }
});

// Initialize game
pickCharacter();
