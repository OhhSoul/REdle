const characters = [
  { name: "Chris Redfield", debut: "Resident Evil", playable: "Yes", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Jill Valentine", debut: "Resident Evil", playable: "Yes", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Barry Burton", debut: "Resident Evil", playable: "No", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Rebecca Chambers", debut: "Resident Evil", playable: "Yes", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Albert Wesker", debut: "Resident Evil", playable: "No", faction: "Umbrella", gender: "Male" },
  { name: "Brad Vickers", debut: "Resident Evil", playable: "No", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: "Yes", faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: "Yes", faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2", playable: "Yes", faction: "Independent", gender: "Female" },
  { name: "Robert Kendo", debut: "Resident Evil 2", playable: "No", faction: "Civilian", gender: "Male" },
  { name: "Ben Bertolucci", debut: "Resident Evil 2", playable: "No", faction: "Civilian", gender: "Male" },
  { name: "Annette Birkin", debut: "Resident Evil 2", playable: "No", faction: "Umbrella", gender: "Female" },
  { name: "William Birkin", debut: "Resident Evil 2", playable: "No", faction: "Umbrella", gender: "Male" },
  { name: "Marvin Branagh", debut: "Resident Evil 2", playable: "No", faction: "Civilian", gender: "Male" },
  { name: "Carlos Oliveira", debut: "Resident Evil 3", playable: "Yes", faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3", playable: "No", faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Victor", debut: "Resident Evil 3", playable: "No", faction: "U.B.C.S.", gender: "Male" }
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
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'table';

  table.innerHTML = `
    <tr><th>Name</th><th>Debut</th><th>Playable</th><th>Faction</th><th>Gender</th></tr>
  `;

  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${currentCharacter.name}</td>
    <td>${check(currentCharacter.debut, guess.debut)}</td>
    <td>${check(currentCharacter.playable, guess.playable, true)}</td>
    <td>${check(currentCharacter.faction, guess.faction)}</td>
    <td>${check(currentCharacter.gender, guess.gender)}</td>
  `;

  table.appendChild(row);
  resultDiv.appendChild(table);
}

function check(actual, guessVal, isPlayable = false) {
  if (actual === guessVal) {
    return `<span class="correct">✔️</span>`;
  } else if (isPlayable) {
    return `${guessVal}`;
  } else {
    return `<span class="incorrect">❌</span>`;
  }
}

function guessCharacter() {
  const input = document.getElementById('guessInput').value.trim().toLowerCase();
  const guess = characters.find(c =>
    c.name.toLowerCase() === input ||
    c.name.toLowerCase().split(" ").some(part => part === input)
  );

  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  if (guess.name === currentCharacter.name) {
    displayResults(guess);
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
    document.getElementById('dropdown').style.display = 'none';
    document.getElementById('playAgain').style.display = 'inline-block';
  } else {
    displayResults(guess);
  }
}

function resetGame() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessButton').disabled = false;
  document.getElementById('dropdown').style.display = 'none';
  document.getElementById('playAgain').style.display = 'none';
  pickCharacter();
}

function toggleLegend() {
  const content = document.getElementById('legend-content');
  content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
}

document.getElementById('guessButton').addEventListener('click', guessCharacter);
document.getElementById('playAgain').addEventListener('click', resetGame);
document.getElementById('guessInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') guessCharacter();
});

document.getElementById('guessInput').addEventListener('input', function() {
  const input = this.value.trim().toLowerCase();
  const dropdown = document.getElementById('dropdown');
  dropdown.innerHTML = '';

  if (input.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  const filtered = characters.filter(c =>
    c.name.toLowerCase().split(" ")[0].startsWith(input) ||
    c.name.toLowerCase().split(" ")[1]?.startsWith(input)
  );

  filtered.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name;
    option.textContent = c.name;
    dropdown.appendChild(option);
  });

  dropdown.style.display = filtered.length > 0 ? 'inline-block' : 'none';

  dropdown.onchange = function() {
    document.getElementById('guessInput').value = dropdown.value;
    dropdown.style.display = 'none';
  };
});

pickCharacter();
