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

let currentCharacter = null;
let guessCount = 0;
const maxGuesses = 8;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgain");
const resultsDiv = document.getElementById("results");
const charactersList = document.getElementById("charactersList");
const guessCounter = document.getElementById("guessCounter");

let table = null;

function updateGuessCounter() {
  guessCounter.textContent = `${guessCount}/${maxGuesses}`;
}

function pickCharacter() {
  let newChar;
  do {
    newChar = characters[Math.floor(Math.random() * characters.length)];
  } while (newChar === currentCharacter);
  currentCharacter = newChar;
  clearGame();
}

function clearGame() {
  guessCount = 0;
  updateGuessCounter();
  resultsDiv.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.style.display = "none";
  guessInput.focus();
  table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `
    <tr>
      <th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th>
    </tr>
  `;
  resultsDiv.appendChild(table);
}

function displayResults(guess) {
  const debutAbbreviations = {
    "Resident Evil": "RE1",
    "Resident Evil 2": "RE2",
    "Resident Evil 3": "RE3"
  };

  const guessRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = guess.name;

  const debutCell = document.createElement("td");
  debutCell.textContent = debutAbbreviations[guess.debut] || guess.debut;
  debutCell.className = guess.debut === currentCharacter.debut ? "match-correct" : "match-wrong";

  const playableCell = document.createElement("td");
  playableCell.textContent = guess.playable ? "Yes" : "No";
  playableCell.className = guess.playable === currentCharacter.playable ? "match-correct" : "match-wrong";

  const factionCell = document.createElement("td");
  factionCell.textContent = guess.faction;
  factionCell.className = guess.faction === currentCharacter.faction ? "match-correct" : "match-wrong";

  const genderCell = document.createElement("td");
  genderCell.textContent = guess.gender;
  genderCell.className = guess.gender === currentCharacter.gender ? "match-correct" : "match-wrong";

  guessRow.appendChild(nameCell);
  guessRow.appendChild(debutCell);
  guessRow.appendChild(playableCell);
  guessRow.appendChild(factionCell);
  guessRow.appendChild(genderCell);
  table.appendChild(guessRow);

  guessCount++;
  updateGuessCounter();

  if (guess.name === currentCharacter.name) {
    showAnswerRow(true);
  } else if (guessCount >= maxGuesses) {
    showAnswerRow(false);
  }
}

function showAnswerRow(correct) {
  const debutAbbreviations = {
    "Resident Evil": "RE1",
    "Resident Evil 2": "RE2",
    "Resident Evil 3": "RE3"
  };

  const answerRow = document.createElement("tr");
  answerRow.style.fontWeight = "bold";
  answerRow.innerHTML = `
    <td><strong>Answer: ${currentCharacter.name}</strong></td>
    <td>${debutAbbreviations[currentCharacter.debut] || currentCharacter.debut}</td>
    <td>${currentCharacter.playable ? "Yes" : "No"}</td>
    <td>${currentCharacter.faction}</td>
    <td>${currentCharacter.gender}</td>
  `;
  table.appendChild(answerRow);
  guessInput.disabled = true;
  guessButton.disabled = true;
  playAgainButton.style.display = "inline-block";
}

function filterDropdownOptions(value) {
  const input = value.trim().toLowerCase();
  charactersList.innerHTML = "";
  if (input.length === 0) return;

  characters.forEach(char => {
    const parts = char.name.toLowerCase().split(" ");
    if (parts.some(part => part.startsWith(input))) {
      const option = document.createElement("option");
      option.value = char.name;
      charactersList.appendChild(option);
    }
  });
}

function guessCharacter() {
  if (guessInput.disabled) return;

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

  if (guess.name === currentCharacter.name || guessCount >= maxGuesses) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.style.display = "inline-block";
  }

  guessInput.value = "";
  guessInput.focus();
}

guessButton.addEventListener("click", guessCharacter);
playAgainButton.addEventListener("click", () => {
  pickCharacter();
});
guessInput.addEventListener("input", (e) => {
  filterDropdownOptions(e.target.value);
});
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    guessCharacter();
  }
});

pickCharacter();
