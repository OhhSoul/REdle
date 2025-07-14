const characters = [
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: true },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: true },
  { name: "Chris Redfield", debut: "Resident Evil", playable: true },
  { name: "Albert Wesker", debut: "Resident Evil", playable: false },
  { name: "Jill Valentine", debut: "Resident Evil", playable: true }
];

let answer = null;
let gameOver = false;

function pickRandomCharacter(excludeName = "") {
  let newAnswer;
  do {
    newAnswer = characters[Math.floor(Math.random() * characters.length)];
  } while (newAnswer.name === excludeName);
  return newAnswer;
}

function findCharacter(input) {
  input = input.toLowerCase();
  const matches = characters.filter(c => c.name.toLowerCase().includes(input));
  if (matches.length === 1) {
    return matches[0];
  } else if (matches.length > 1) {
    alert("Be more specific, multiple matches.");
    return null;
  } else {
    return null;
  }
}

function makeGuess() {
  if (gameOver) return;

  const guessInput = document.getElementById("guess");
  const resultsDiv = document.getElementById("results");
  const playAgainBtn = document.getElementById("play-again");
  const gameContainer = document.getElementById("game-container");

  const guessText = guessInput.value.trim().toLowerCase();
  const guess = findCharacter(guessText);

  if (!guess) {
    alert("Not a valid or specific enough character.");
    guessInput.value = "";
    return;
  }

  const row = document.createElement("div");
  row.classList.add("guess-row");

  const nameCell = document.createElement("div");
  nameCell.classList.add("cell", "name-header");
  nameCell.textContent = guess.name;
  row.appendChild(nameCell);

  const debutCell = document.createElement("div");
  debutCell.classList.add("cell");
  debutCell.textContent = guess.debut === answer.debut ? "✅" : "❌";
  row.appendChild(debutCell);

  const playableCell = document.createElement("div");
  playableCell.classList.add("cell");
  playableCell.textContent = guess.playable === answer.playable ? "✅" : "❌";
  row.appendChild(playableCell);

  resultsDiv.appendChild(row);

  if (guess.name === answer.name) {
    const winRow = document.createElement("div");
    winRow.innerHTML = `<p>🎉 Correct! The answer was <strong>${answer.name}</strong>.</p>`;
    resultsDiv.appendChild(winRow);
    playAgainBtn.style.display = "inline";
    gameContainer.style.display = "none"; // completely hide input + button
    gameOver = true;
  }

  guessInput.value = "";
  closeAutocomplete();
}

// Autocomplete functionality
document.getElementById("guess").addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const listDiv = document.getElementById("autocomplete-list");
  listDiv.innerHTML = "";
  if (!val) return;

  characters
    .filter(c => c.name.toLowerCase().includes(val))
    .forEach(c => {
      const div = document.createElement("div");
      div.textContent = c.name;
      div.classList.add("autocomplete-item");
      div.onclick = function () {
        document.getElementById("guess").value = c.name;
        closeAutocomplete();
      };
      listDiv.appendChild(div);
    });
});

function closeAutocomplete() {
  document.getElementById("autocomplete-list").innerHTML = "";
}

document.addEventListener("click", function (e) {
  if (e.target.id !== "guess") {
    closeAutocomplete();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});

function resetGame() {
  const resultsDiv = document.getElementById("results");
  const playAgainBtn = document.getElementById("play-again");
  const gameContainer = document.getElementById("game-container");

  const oldAnswer = answer ? answer.name : "";
  answer = pickRandomCharacter(oldAnswer);

  resultsDiv.innerHTML = `
    <div class="header-row">
      <div class="cell name-header">Name</div>
      <div class="cell">Debut</div>
      <div class="cell">Playable</div>
    </div>
  `;

  playAgainBtn.style.display = "none";
  gameContainer.style.display = "block";
  document.getElementById("guess").value = "";
  gameOver = false;
}

resetGame();
