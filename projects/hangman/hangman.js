const arrayPool = [
    { category: 'fruits', word: 'apple', hint: 'An _____ a day keeps the doctor away.' },
    { category: 'fruits', word: 'banana', hint: 'Not just a fruit, but sometimes a republic.' },
    { category: 'fruits', word: 'cherry', hint: 'Dieter sings it, but you probably don’t.' },
    { category: 'mountains', word: 'Everest', hint: 'The highest mountain in the world. Bring oxygen.' },
    { category: 'mountains', word: 'Matterhorn', hint: 'A famous mountain in the Alps. Also on chocolate.' },
    { category: 'mountains', word: 'Kilimanjaro', hint: 'The highest mountain in Africa. No lions on top.' },
    { category: 'Dog Breeds', word: 'Labrador', hint: 'Loves eating, swimming, and pretending to be a lapdog.' },
    { category: 'Dog Breeds', word: 'Husky', hint: 'Prefers snow over sun. Will talk back.' },
    { category: 'Dog Breeds', word: 'Rottweiler', hint: 'Maybe ask before petting. Seriously.' },
    { category: 'Music Artists', word: 'Bob Dylan', hint: 'Like a rolling stone, but with a Nobel Prize.' },
    { category: 'Music Artists', word: 'Bruce Springsteen', hint: 'Born in the USA, but not born yesterday.' },
    { category: 'Music Artists', word: 'Taylor Swift', hint: 'Shake it off! (And maybe write a song about it.)' }
];

let randomWord = "";      // Stores the randomly selected word
let lettersInWord = [];   // Stores the letters of the selected word
let errorCounter = 0;     // Tracks the number of incorrect guesses

// ------------------ Game Initialization & Reset --------------------

function startGame() {
    resetButtons();
    resetElements();
    randomWordSelector(arrayPool);
    wordSplitter(randomWord);
    displayWord(randomWord);
    hangmanImage();
}

function resetElements() {
    document.getElementById("hint-text").innerText = "You don’t need a hint... yet.";
    errorCounter = 0;
    document.getElementById("wrong-guesses").innerText = errorCounter;
    hangmanImage();
    document.getElementById("showResult").innerText = "That can't be too difficult...";
    document.getElementById("showResult").style.color = "#b5b5b5";
}

function resetButtons() {
    document.querySelectorAll('button.disabled').forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}

// ------------------ Word Selection & Display -----------------------

function randomWordSelector(arrayPool) {
    const randomIndex = Math.floor(Math.random() * arrayPool.length);
    const selectedObject = arrayPool[randomIndex];
    randomWord = selectedObject.word.toLowerCase();

    console.log("Selected Word: " + randomWord);
    console.log("Category: " + selectedObject.category);
    console.log("Hint: " + selectedObject.hint);

    return randomWord;
}

function wordSplitter(wordToSplit) {
    lettersInWord = wordToSplit.split("");
    console.log("Letters in Word: " + lettersInWord);
    return lettersInWord;
}

function displayWord(randomWord) {
    const targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = "";

    for (let i = 0; i < randomWord.length; i++) {
        const createLi = document.createElement("li");
        if (randomWord[i] >= 'a' && randomWord[i] <= 'z') {
            createLi.textContent = '_';
        } else {
            createLi.textContent = randomWord[i];
        }
        targetWordList.appendChild(createLi);
    }
    console.log(randomWord.length + " <li> elements with underscores generated");
}

// ------------------ Player Interaction & Game Logic ----------------

function handleKeyPress(letter) {
    console.log("Guess = " + letter);
    checkPlayerGuess(letter);

    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

function checkPlayerGuess(guessValue) {
    console.log("Guessed Letter: " + guessValue);

    const liElements = wordList.getElementsByTagName("li");
    let matchFound = false;

    for (let i = 0; i < lettersInWord.length; i++) {
        if (lettersInWord[i] === guessValue.toLowerCase()) {
            liElements[i].textContent = guessValue;
            matchFound = true;
        }
    }

    updateCounterError(matchFound);
    winnerLogic();
}

function winnerLogic() {
    const allLettersRevealed = Array.from(document.querySelectorAll("#wordList li"))
        .every(li => li.textContent !== "_");

    if (allLettersRevealed) {
        document.getElementById("hint-text").innerText = "Yaaaay!";
        document.getElementById("showResult").innerText = "You did it!!!";
        document.querySelectorAll('.key-pad button').forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
    }
}

// ------------------ Error Handling & Feedback ----------------------

function updateCounterError(matchFound) {
    if (!matchFound) {
        errorCounter++;
        document.getElementById("wrong-guesses").innerText = errorCounter;
        hangmanImage();
        errorCounterLogic();
    }
}

function errorCounterLogic() {
    if (errorCounter >= 8) {
        document.getElementById("showResult").innerText = "GAME OVER!!!";
        document.getElementById("showResult").style.color = "rgb(255, 134, 134)";
        document.querySelectorAll('.key-pad button').forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
    } else if (errorCounter === 3) {
        document.getElementById("showResult").innerText = "You know what you're doing... right?";
    } else if (errorCounter === 5) {
        document.getElementById("hint-text").innerText = "Still no clue? Maybe you actually want a hint...";
        document.getElementById("showResult").innerText = "It's okay, nobody's watching.";
    } else if (errorCounter === 6) {
        const currentWordObject = arrayPool.find(item => item.word.toLowerCase() === randomWord);
        if (currentWordObject && currentWordObject.hint) {
            document.getElementById("hint-text").innerText = currentWordObject.hint;
        } else {
            document.getElementById("hint-text").innerText = "No hint available! (But you probably need one.)";
        }
    }
}

// ------------------ Hangman Image Handling -------------------------

function hangmanImage() {
    const hangmanStages = [
        "./assets/pictures/hangman0.png",
        "./assets/pictures/hangman1.png",
        "./assets/pictures/hangman2.png",
        "./assets/pictures/hangman3.png",
        "./assets/pictures/hangman4.png",
        "./assets/pictures/hangman5.png",
        "./assets/pictures/hangman6.png",
        "./assets/pictures/hangman7.png",
        "./assets/pictures/hangman8.png"
    ];

    const targetHangmanBox = document.querySelector(".hangman-box");
    targetHangmanBox.innerHTML = "";

    const hangmanImg = document.createElement("img");
    hangmanImg.src = hangmanStages[errorCounter];
    hangmanImg.alt = `Hangman Stage ${errorCounter}`;
    hangmanImg.style.width = "70%";
    hangmanImg.style.height = "auto";

    targetHangmanBox.appendChild(hangmanImg);
    console.log(`Image ${errorCounter} appended`);
}