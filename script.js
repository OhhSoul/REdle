// Your list of characters & their properties
const characters = [
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: true },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: true },
  { name: "Chris Redfield", debut: "Resident Evil", playable: true },
  { name: "Albert Wesker", debut: "Resident Evil", playable: false },
  { name: "Jill Valentine", debut: "Resident Evil", playable: true }
];

// Pick a random character
const answer = characters[Math.floor(Math.random() * characters.length)];

function makeGuess() {
  const guessInput = document.getElementById("guess");
  const resultsDiv = document.getElementById("results");

  const guessName = guessInput.value.trim();
  const guess = characters.find(c => c.name.toLowerCase() === guessName.toLowerCase());

  if (!guess) {
    resultsDiv.innerHTML += `<p>❌ ${guessName} is not in the game.</p>`;
    return;
  }

  let feedback = `<p>Guess: <strong>${guess.name}</strong><br>`;

  feedback += `Debut Game: ${guess.debut === answer.debut ? '✅' : '❌'}<br>`;
  feedback += `Playable: ${guess.playable === answer.playable ? '✅' : '❌'}</p>`;

  resultsDiv.innerHTML += feedback;

  if (guess.name === answer.name) {
    resultsDiv.innerHTML += `<p>🎉 Correct! The answer was ${answer.name}.</p>`;
  }

  guessInput.value = "";
}
