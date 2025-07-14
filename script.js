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

let currentCharacter;

function pickCharacter() {
  let newChar;
  do {
    newChar = characters[Math.floor(Math.random() * characters.length)];
  } while (newChar === currentCharacter);
  currentCharacter = newChar;
}

function displayResults(guess) {
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table";

  table.innerHTML = `
    <tr><th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th></tr>
  `;

  const row = document.createElement("tr");

  // "Your guess" data
  row.innerHTML = `
    <td>${guess.name}</td>
    <td>${check(currentCharacter.debut, guess.debut)}</td>
    <td>${guess.playable ? "Yes" : "No"}</td>
    <td>${check(currentCharacter.faction, guess.faction)}</td>
    <td>${check(currentCharacter.gender, guess.gender)}</td>
  `;

  table.appendChild(row);

  // Correct answer row on the left side
  const correctRow = document.createElement("tr");
  correctRow.style.borderTop = "2px solid #f44336";
  correctRow.innerHTML = `
    <td><strong>Answer: ${currentCharacter.name}</strong></td>
    <td>${currentCharacter.debut}</td>
    <td>${currentCharacter.playable ? "✔️" : "❌"}</td>
    <td>${currentCharacter.faction}</td>
    <td>${currentCharacter.gender}</td>
  `;
  table.insertBefore(correctRow, table.firstChild);

  resultDiv.appendChild(table);
}

function check(actual, guessVal) {
  if (actual === guessVal) return `<span class="correct">✔️</span>`;
  else return `<span class="incorrect">❌</span>`;
}

function guessCharacter() {
  const input = document.getElementById("guessInput").value.trim().toLowerCase();
  const guess = characters.find(
    (c) =>
      c.name.toLowerCase() === input ||
      c.name
        .toLowerCase()
        .split(" ")
        .some((part) => part === input)
  );

  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  displayResults(guess);

  if (guess.name === currentCharacter.name) {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
    document.getElementById("playAgain").style.display = "inline-block";
  }
}

function resetGame() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessButton").disabled = false;
  document.getElementById("playAgain").style.display = "none";
  pickCharacter();
  closeAllLists();
}

function toggleLegend() {
  const content = document.getElementById("legend-content");
  content.style.display =
    content.style.display === "block" ? "none" : "block";
}

// Autocomplete implementation inside the input box:

const guessInput = document.getElementById("guessInput");

guessInput.addEventListener("input", function () {
  const val = this.value.trim().toLowerCase();
  closeAllLists();
  if (!val) return false;

  // Container for suggestions
  const list = document.createElement("div");
  list.setAttribute("id", this.id + "-autocomplete-list");
  list.setAttribute("class", "autocomplete-items");
  this.parentNode.appendChild(list);

  // Filter characters where first or last name starts with val
  const filtered = characters.filter(
    (c) =>
      c.name.toLowerCase().split(" ")[0].startsWith(val) ||
      (c.name.toLowerCase().split(" ")[1] &&
        c.name.toLowerCase().split(" ")[1].startsWith(val))
  );

  filtered.forEach((c) => {
    const item = document.createElement("div");
    // Highlight matching part
    const [firstName, lastName = ""] = c.name.split(" ");
    let displayName;

    if (firstName.toLowerCase().startsWith(val)) {
      displayName = `<strong>${firstName.substr(0, val.length)}</strong>${firstName.substr(val.length)} ${lastName}`;
    } else if (lastName.toLowerCase().startsWith(val)) {
      displayName = `${firstName} <strong>${lastName.substr(0, val.length)}</strong>${lastName.substr(val.length)}`;
    } else {
      displayName = c.name;
    }

    item.innerHTML = displayName;

    item.addEventListener("click", function () {
      guessInput.value = c.name;
      closeAllLists();
    });

    list.appendChild(item);
  });
});

function closeAllLists(elmnt) {
  const items = document.getElementsByClassName("autocomplete-items");
  for (let i = items.length - 1; i >= 0; i--) {
    if (elmnt != items[i] && elmnt != guessInput) {
      items[i].parentNode.removeChild(items[i]);
    }
  }
}

document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});

document.getElementById("guessButton").addEventListener("click", guessCharacter);
document.getElementById("playAgain").addEventListener("click", resetGame);

// Initialize game on page load
pickCharacter();
