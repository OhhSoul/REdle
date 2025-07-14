document.addEventListener("DOMContentLoaded", () => {
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
    <tr><th>Attribute</th><th>Your Guess</th><th>Correct?</th></tr>
  `;

  const attributes = ['name', 'debut', 'playable', 'faction', 'gender'];

  attributes.forEach(attr => {
    const row = document.createElement('tr');
    const isCorrect = guess[attr] === currentCharacter[attr];

    let guessValue = guess[attr];
    if (!isCorrect && attr !== 'name') {
      if (attr === 'playable') {
        guessValue = guess[attr] === '✅' ? 'Yes' : 'No';
      }
      if (attr === 'debut' || attr === 'faction' || attr === 'gender') {
        guessValue = guess[attr];
      }
    } else if (isCorrect && attr === 'playable') {
      guessValue = 'Yes';
    }

    row.innerHTML = `
      <td>${attr.charAt(0).toUpperCase() + attr.slice(1)}</td>
      <td>${guessValue}</td>
      <td>${isCorrect ? '<span class="correct">✔️</span>' : '<span class="incorrect">❌</span>'}</td>
    `;
    table.appendChild(row);
  });

  resultDiv.appendChild(table);
}

function guessCharacter() {
  const inputVal = document.getElementById('guessInput').value.trim().toLowerCase();

  const guess = characters.find(c => {
    const parts = c.name.toLowerCase().split(" ");
    return c.name.toLowerCase() === inputVal || parts.some(part => part === inputVal);
  });

  if (!guess) {
    alert("Character not found. Try again.");
    return;
  }

  displayResults(guess);

  if (guess.name === currentCharacter.name) {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
    document.getElementById('playAgain').style.display = 'inline-block';
  } else {
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
  }
}

function resetGame() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessButton').disabled = false;
  document.getElementById('playAgain').style.display = 'none';
  pickCharacter();
}

function toggleLegend() {
  const content = document.getElementById('legend-content');
  content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
}

function setupAutocomplete() {
  const input = document.getElementById('guessInput');

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    let list = document.getElementById('characterList');
    if (!list) {
      list = document.createElement('datalist');
      list.id = 'characterList';
      document.body.appendChild(list);
      input.setAttribute('list', 'characterList');
    }

    list.innerHTML = '';

    if (val.length === 0) return;

    const matches = characters.filter(c => {
      const [first, last] = c.name.toLowerCase().split(' ');
      return first.startsWith(val) || last.startsWith(val);
    });

    matches.forEach(c => {
      const option = document.createElement('option');
      option.value = c.name;
      list.appendChild(option);
    });
  });
}

document.getElementById('guessButton').addEventListener('click', guessCharacter);
document.getElementById('playAgain').addEventListener('click', resetGame);
document.getElementById('legend').addEventListener('click', toggleLegend);
document.getElementById('guessInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') guessCharacter();
});

pickCharacter();
setupAutocomplete();
});
