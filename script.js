const characters = [
  // Resident Evil 0
  { name: "Rebecca Chambers", debut: "Resident Evil 0", playable: "Yes", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Billy Coen", debut: "Resident Evil 0", playable: "Yes", faction: "Civilian", gender: "Male" },

  // Resident Evil (1996)
  { name: "Jill Valentine", debut: "Resident Evil (1996)", playable: "Yes", faction: "S.T.A.R.S.", gender: "Female" },
  { name: "Chris Redfield", debut: "Resident Evil (1996)", playable: "Yes", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Barry Burton", debut: "Resident Evil (1996)", playable: "No", faction: "S.T.A.R.S.", gender: "Male" },
  { name: "Albert Wesker", debut: "Resident Evil (1996)", playable: "No", faction: "S.T.A.R.S.", gender: "Male" },

  // Resident Evil 2 (1998)
  { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: "Yes", faction: "Civilian", gender: "Male" },
  { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: "Yes", faction: "Civilian", gender: "Female" },
  { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: "Yes", faction: "Unknown", gender: "Female" },
  { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: "Yes", faction: "Civilian", gender: "Female" },
  { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: "No", faction: "Umbrella", gender: "Male" },

  // Resident Evil 3 (1999)
  { name: "Carlos Oliveira", debut: "Resident Evil 3 (1999)", playable: "Yes", faction: "U.B.C.S.", gender: "Male" },
  { name: "Mikhail Viktor", debut: "Resident Evil 3 (1999)", playable: "No", faction: "U.B.C.S.", gender: "Male" },
  { name: "Nicholai Ginovaef", debut: "Resident Evil 3 (1999)", playable: "No", faction: "U.B.C.S.", gender: "Male" },
  { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: "No", faction: "Umbrella", gender: "Male" },

  // Resident Evil Code: Veronica
  { name: "Steve Burnside", debut: "Resident Evil Code: Veronica", playable: "Yes", faction: "Civilian", gender: "Male" },
  { name: "Alexia Ashford", debut: "Resident Evil Code: Veronica", playable: "No", faction: "Umbrella", gender: "Female" },
  { name: "Alfred Ashford", debut: "Resident Evil Code: Veronica", playable: "No", faction: "Umbrella", gender: "Male" },

  // Resident Evil 4 (2005)
  { name: "Ashley Graham", debut: "Resident Evil 4", playable: "Yes", faction: "Civilian", gender: "Female" },
  { name: "Luis Sera", debut: "Resident Evil 4", playable: "No", faction: "Los Iluminados", gender: "Male" },
  { name: "Jack Krauser", debut: "Resident Evil 4", playable: "No", faction: "Los Iluminados", gender: "Male" },
  { name: "Ramon Salazar", debut: "Resident Evil 4", playable: "No", faction: "Los Iluminados", gender: "Male" },
  { name: "Osmund Saddler", debut: "Resident Evil 4", playable: "No", faction: "Los Iluminados", gender: "Male" }
];

let currentCharacter = null;
let isDaily = false;
let guesses = 0;
const maxGuesses = 8;

document.addEventListener("DOMContentLoaded", () => {
  const mode = sessionStorage.getItem("mode");
  isDaily = mode === "daily";
  currentCharacter = isDaily ? getDailyCharacter() : getRandomCharacter();
  populateDropdown();
  document.getElementById("guessCount").textContent = `0/${maxGuesses}`;
});

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function getDailyCharacter() {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4); // Eastern Time
  const seed = now.toISOString().split("T")[0];
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return characters[hash % characters.length];
}

function populateDropdown() {
  const dataList = document.getElementById("charactersList");
  characters.forEach(char => {
    const option = document.createElement("option");
    option.value = char.name;
    dataList.appendChild(option);
  });
}

function guessCharacter() {
  if (guesses >= maxGuesses) return;

  const input = document.getElementById("guessInput").value.trim();
  const guess = characters.find(c => c.name.toLowerCase() === input.toLowerCase());
  if (!guess) {
    alert("Character not found.");
    return;
  }

  guesses++;
  document.getElementById("guessCount").textContent = `${guesses}/${maxGuesses}`;

  const resultTable = document.getElementById("results");
  const row = document.createElement("div");
  row.className = "result-row";

  ["name", "debut", "playable", "faction", "gender"].forEach(attr => {
    const box = document.createElement("div");
    box.className = "result-box";
    box.textContent = guess[attr];
    box.classList.add(guess[attr] === currentCharacter[attr] ? "correct" : "incorrect");
    row.appendChild(box);
  });

  resultTable.appendChild(row);
  document.getElementById("guessInput").value = "";

  if (guess.name === currentCharacter.name) {
    showEndScreen(true);
  } else if (guesses === maxGuesses) {
    showEndScreen(false);
  }
}

function showEndScreen(win) {
  const message = win
    ? `You guessed correctly: ${currentCharacter.name}!`
    : `You lost. The correct answer was ${currentCharacter.name}.`;
  setTimeout(() => alert(message), 100);
}

document.getElementById("guessButton").addEventListener("click", guessCharacter);
document.getElementById("guessInput").addEventListener("keypress", e => {
  if (e.key === "Enter") guessCharacter();
});
