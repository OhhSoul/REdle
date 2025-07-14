const characters = [
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: true },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: true },
  { name: "Chris Redfield", debut: "Resident Evil", playable: true },
  { name: "Albert Wesker", debut: "Resident Evil", playable: false },
  { name: "Jill Valentine", debut: "Resident Evil", playable: true }
];

let answer = null;

function populateDatalist() {
  const datalist = document.getElementById("characters");
  datalist.innerHTML = "";
  characters
    .map(c => c.name)
    .sort()
    .forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      datalist.appendChild(option);
    });
}

function pickRandomCharacter(excludeName = "") {
  let newAnswer;
  do {
    newAnswer = characters[Math.floor(Math.random() * characters.length)];
  } while (newAnswer.name === excludeName);
  return newAnswer;
}

function makeGuess() {
  const guessInput = document.getElementById("guess");
  const resultsDiv = document.getElementById("results");
  const playAgainBtn = document.getElementById("play-again");

  const guessText = guessInput.value.trim().toLowerCase();
  const guess = characters.find(c => c.name.toLowerCase() === guessText);

  if (!guess) {
    alert("Not a valid character.");
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
  }

  guessInput.value = "";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});

function resetGame() {
  const resultsDiv = document.getElementById("results");
  const playAgainBtn = document.getElementById("play-again");

  const oldAnswer = answer ? answer.name : "";
  answer = pickRandomCharacter(oldAnswer);

  // Reset results area but keep header
  resultsDiv.innerHTML = `
    <div class="header-row">
      <div class="cell name-header">Name</div>
      <div class="cell">Debut</div>
      <div class="cell">Playable</div>
    </div>
  `;

  playAgainBtn.style.display = "none";
}

populateDatalist();
resetGame();
