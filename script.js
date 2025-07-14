const characters = [
  { name: "Leon Kennedy", debut: "Resident Evil 2", playable: true },
  { name: "Claire Redfield", debut: "Resident Evil 2", playable: true },
  { name: "Chris Redfield", debut: "Resident Evil", playable: true },
  { name: "Albert Wesker", debut: "Resident Evil", playable: false },
  { name: "Jill Valentine", debut: "Resident Evil", playable: true }
];

// Pick a random character as the answer
const answer = characters[Math.floor(Math.random() * characters.length)];

function makeGuess() {
  const guessInput = document.getElementById("guess");
  const resultsDiv = document.getElementById("results");

  const guessText = guessInput.value.trim().toLowerCase();

  // Try to find a character matching by first or last name or full name (case-insensitive)
  const guess = characters.find(c => {
    const names = c.name.toLowerCase().split(" ");
    return names.includes(guessText) || c.name.toLowerCase() === guessText;
  });

  if (!guess) {
    resultsDiv.innerHTML += `<p>❌ "${guessInput.value}" is not in the game.</p>`;
    guessInput.value = "";
    return;
  }

  // Compare each category to the answer and mark yes/no
  let feedback = `<p>Guess: <strong>${guess.name}</strong><br>`;

  feedback += `Debut Game: ${guess.debut === answer.debut ? '✅' : '❌'}<br>`;
  feedback += `Playable: ${guess.playable === answer.playable ? '✅' : '❌'}</p>`;

  resultsDiv.innerHTML += feedback;

  // If correct character guessed
  if (guess.name === answer.name) {
    resultsDiv.innerHTML += `<p>🎉 Correct! The answer was ${answer.name}.</p>`;
  }

  guessInput.value = "";
}
