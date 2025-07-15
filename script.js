// Character list
const characters = [
    { name: "Leon Kennedy", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Male" },
    { name: "Claire Redfield", debut: "Resident Evil 2 (1998)", playable: true, faction: "Civilian", gender: "Female" },
    { name: "Chris Redfield", debut: "Resident Evil 1 (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Male" },
    { name: "Jill Valentine", debut: "Resident Evil 1 (1996)", playable: true, faction: "S.T.A.R.S.", gender: "Female" },
    { name: "Ada Wong", debut: "Resident Evil 2 (1998)", playable: false, faction: "Unknown", gender: "Female" },
    { name: "Ben Bertolucci", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Male" },
    { name: "HUNK", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
    { name: "Sherry Birkin", debut: "Resident Evil 2 (1998)", playable: false, faction: "Civilian", gender: "Female" },
    { name: "Brian Irons", debut: "Resident Evil 2 (1998)", playable: false, faction: "RPD", gender: "Male" },
    { name: "Mr. X", debut: "Resident Evil 2 (1998)", playable: false, faction: "Umbrella", gender: "Male" },
    { name: "Dario Rosso", debut: "Resident Evil 3 (1999)", playable: false, faction: "Civilian", gender: "Male" },
    { name: "Nemesis", debut: "Resident Evil 3 (1999)", playable: false, faction: "Umbrella", gender: "Male" },
    { name: "Billy Coen", debut: "Resident Evil 0", playable: true, faction: "Civilian", gender: "Male" },
    { name: "James Marcus", debut: "Resident Evil 0", playable: false, faction: "Umbrella", gender: "Male" },
    { name: "Steve Burnside", debut: "Resident Evil Code Veronica", playable: true, faction: "Civilian", gender: "Male" },
    { name: "Alexia Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Female" },
    { name: "Alfred Ashford", debut: "Resident Evil Code Veronica", playable: false, faction: "Umbrella", gender: "Male" },
    { name: "Ashley Graham", debut: "Resident Evil 4 (2005)", playable: true, faction: "Civilian", gender: "Female" },
    { name: "Ramon Salazar", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
    { name: "Osmund Saddler", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
    { name: "Ingrid Hunnigan", debut: "Resident Evil 4 (2005)", playable: false, faction: "U.S. Government", gender: "Female" },
    { name: "Luis Sera", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
    { name: "Bitores Mendez", debut: "Resident Evil 4 (2005)", playable: false, faction: "Los Iluminados", gender: "Male" },
    { name: "Jack Krauser", debut: "Resident Evil 4 (2005)", playable: false, faction: "U.S. Government", gender: "Male" },
    { name: "Merchant", debut: "Resident Evil 4 (2005)", playable: false, faction: "Unknown", gender: "Male" }
];

// Daily character logic
function getDailyCharacter() {
    const now = new Date();
    const midnightET = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    midnightET.setHours(0, 0, 0, 0);
    const daySeed = Math.floor(midnightET.getTime() / (1000 * 60 * 60 * 24));
    let availableCharacters = characters.filter(c => !wasRecentlyUsed(c.name));
    if (availableCharacters.length === 0) availableCharacters = characters;
    const index = daySeed % availableCharacters.length;
    const selected = availableCharacters[index];
    markAsUsed(selected.name);
    return selected;
}

function markAsUsed(name) {
    let history = JSON.parse(localStorage.getItem("dailyHistory")) || [];
    if (!history.includes(name)) history.push(name);
    if (history.length > 14) history.shift();
    localStorage.setItem("dailyHistory", JSON.stringify(history));
}

function wasRecentlyUsed(name) {
    const history = JSON.parse(localStorage.getItem("dailyHistory")) || [];
    return history.includes(name);
}

let secretCharacter;
let guesses = 0;
const maxGuesses = 8;

document.addEventListener("DOMContentLoaded", () => {
    const guessForm = document.getElementById("guessForm");
    const guessInput = document.getElementById("guessInput");
    const guessCountDisplay = document.getElementById("guessCount");
    const playBtn = document.getElementById("playBtn");
    const dailyBtn = document.getElementById("dailyBtn");
    const home = document.getElementById("home");
    const game = document.getElementById("game");
    const title = document.getElementById("title");

    function startGame(mode) {
        guesses = 0;
        guessCountDisplay.textContent = `${guesses}/8`;
        document.getElementById("guesses").innerHTML = "";
        document.querySelector(".win-screen")?.remove();
        document.querySelector(".lose-screen")?.remove();
        home.style.display = "none";
        game.style.display = "block";
        guessInput.value = "";

        if (mode === "daily") {
            secretCharacter = getDailyCharacter();
        } else {
            secretCharacter = characters[Math.floor(Math.random() * characters.length)];
        }
    }

    playBtn.addEventListener("click", () => startGame("play"));
    dailyBtn.addEventListener("click", () => startGame("daily"));
    title.addEventListener("click", () => {
        home.style.display = "block";
        game.style.display = "none";
    });

    // Populate dropdown
    const datalist = document.getElementById("characters");
    characters.forEach(char => {
        const option = document.createElement("option");
        option.value = char.name;
        datalist.appendChild(option);
    });

    guessForm.addEventListener("submit", e => {
        e.preventDefault();
        const guessName = guessInput.value.trim();
        const guessed = characters.find(c => c.name.toLowerCase() === guessName.toLowerCase());
        if (!guessed) return;

        guesses++;
        guessCountDisplay.textContent = `${guesses}/8`;

        const row = document.createElement("tr");
        const properties = ["name", "debut", "playable", "faction", "gender"];
        properties.forEach(prop => {
            const td = document.createElement("td");
            const guessValue = guessed[prop].toString();
            const actualValue = secretCharacter[prop].toString();
            td.textContent = guessValue;
            td.className = guessValue === actualValue ? "correct" : "incorrect";
            row.appendChild(td);
        });

        document.getElementById("guesses").appendChild(row);

        if (guessed.name === secretCharacter.name) {
            showEndScreen(true);
        } else if (guesses >= maxGuesses) {
            showEndScreen(false);
        }

        guessInput.value = "";
    });
});

function showEndScreen(win) {
    const screen = document.createElement("div");
    screen.className = win ? "win-screen" : "lose-screen";
    screen.innerHTML = win ? "You Win!" : `You Lose!<br>The correct answer was ${secretCharacter.name}`;
    document.body.appendChild(screen);
}
