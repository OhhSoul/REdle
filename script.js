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
      // For normal text: green if exact match, red otherwise
      const cls = value === highlightValue ? "correct" : "incorrect";
      row.innerHTML += `<td class="${cls}">${value}</td>`;
    } else {
      // For emoji, special logic for partial match (🔷 vs ✅)
      let cls = "incorrect";
      if (value === highlightValue) cls = "correct";
      else if (value === "🔷" && highlightValue === "✅") cls = "partial";
      row.innerHTML += `<td class="${cls}">${value}</td>`;
    }
    table.appendChild(row);
  }

  addRow("Name", charObj.name, highlightObj.name);
  addRow("Debut", charObj.debut, highlightObj.debut);
 
