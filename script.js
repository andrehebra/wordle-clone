//number of word guesses allowed
const numberOfAttempts = 6;
//length of the words that can be guessed
const wordLength = 5;
//variable for the word that needs to be guessed
let correctWord = '';
let wordPosition = 0;
//current word trying to submit
let submission = '';
//lists of correct guesses for keyboard
let perfectMatch = [];
let rightLetter = [];


//event listener to catch each keystroke
window.addEventListener('keydown', function (e) {

    //change keys to uppercase
    addLetter(e.key.toUpperCase());
    console.log(e.key.toUpperCase())

    //check to see if keys pressed are from alphabet

    //add keystroke
    
});

//add keystroke
function addLetter(letter) {

    //const upperCase = letter.toUpperCase();

    if (letter.match("^[a-zA-Z\(\)]+$") && letter.length == 1) {
        //addLetter(letter);
    } else if (letter == 'BACKSPACE' || letter == 'DELETE') {
        backSpace();
        return;
    } else if (letter == 'ENTER') {
        submitWord();
        return;
    } else {
        return;
    }

    //check if current row has been played
    for (i = 1; i <= numberOfAttempts; i++) {
        if (document.getElementById('row-' + i).getAttribute('played') == 'false') {
            
            //check if letters have already been put in row
            for (j = 1; j <= wordLength; j++) {
                const currentLetter = document.getElementById('row-' + i + '-letter-' + j);
                //if letter box has not been played yet, add letter there
                if (currentLetter.getAttribute('played') == 'false') {
                    currentLetter.innerText = letter;
                    currentLetter.setAttribute('played', 'true');
                    currentLetter.setAttribute('letter', letter);
                    return;
                }
            }
            //return once the letter has been added
            return;

        } else {
            //console.log('didnotwork...');
        }
    }
}

//get the word that is typed in, starting at the row specified
function getCurrentWord(startingRow) {

    submission = '';

    if (startingRow > numberOfAttempts) {
        return 'IGNORE';
    }

    if (document.getElementById('row-' + startingRow).getAttribute('played') == 'false') {
        for (j = 1; j <= wordLength; j++) {
            const currentLetter = document.getElementById('row-' + startingRow + '-letter-' + j);
            //check if the letter is empty, if empty spaces, simply return
            if (currentLetter.getAttribute('played') == 'false') {
                return 'IGNORE';
            }

            //add letters into submission to create complete word
            submission = submission + currentLetter.getAttribute('letter');
            
        }
        //make sure it is in the word list
        if (wordList.includes(submission)) {
            document.getElementById('row-' + startingRow).setAttribute('played', 'true');

            
            for (j = 0; j < wordLength; j++) {
                const currentElement = document.getElementById('row-' + startingRow + '-letter-' + (j+1));
                if (correctWord[j] == submission[j]) {
                    currentElement.classList.add('correct-spot');
                    perfectMatch = perfectMatch.concat(submission[j]);
                    //console.log(perfectMatch);
                } else if (correctWord.includes(submission[j])) {
                    currentElement.classList.add('in-word');
                    rightLetter = rightLetter.concat(submission[j]);
                    //console.log(rightLetter);
                } else {
                    currentElement.classList.add('not-in-word');
                }
            }

            //update keyboard
            perfectMatch.forEach( function (e) {
                const letter = document.getElementById(e)
                letter.classList.add('green-key');
            });

            rightLetter.forEach( function (e) {
                const letter = document.getElementById(e)
                letter.classList.add('yellow-key');
            });

            return submission;
        } else {
            console.log(submission);
            console.log('doesnt contain');
        }
        

    } else {
        getCurrentWord(startingRow + 1);
    }

    return 'IGNORE';
}

//submit word that is in the last row
function submitWord() {

    //get word from row
    const wordToCheck = getCurrentWord(1);
    if (wordToCheck == 'IGNORE') {
        return;
    }

    if (wordToCheck == correctWord) {
        winGame();
    } else {
        checkLetters();
    }

}

function checkLetters() {

}

function winGame() {

}

function backSpace() {
    for (i = 1; i <= numberOfAttempts; i++) {

        const currentRow = document.getElementById('row-' + i);

        for (j = wordLength; j >= 1; j--) {
            const currentElement = document.getElementById('row-' + i + '-letter-' + j);
            if (currentElement.getAttribute('played') == 'true' && currentRow.getAttribute('played') == 'false') {
                currentElement.textContent = '';
                currentElement.setAttribute('played', 'false');
                return;
            }
        }
    }
}

function newGame() {
    //pick the word that needs to be guessed
    wordPosition = Math.floor(Math.random() * wordList.length);
    correctWord = wordList[wordPosition];
    correctWord = correctWord.toUpperCase();
    console.log(correctWord);

    //create keyboard for game
    createKeyboard();
    //reset keyboard lists of matches
    perfectMatch = [];
    rightLetter = [];


    //finds the main grid in index.html
    const mainGrid = document.getElementById('main-grid');

    mainGrid.innerHTML = '';

    //adding a grid of elements to mainGrid
    for (i = 1; i <= numberOfAttempts; i++) {

        //creating row and adding attributes to it
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row-' + i;
        row.setAttribute('played', 'false');

        //adding the individual letters to each row
        for (j = 1; j <= wordLength; j++) {

            //creating letters and adding attributes
            let letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            letterBox.id = 'row-' + i + '-letter-' + j;
            letterBox.setAttribute('played', 'false');

            //set default dext to nothing
            letterBox.textContent = '';

            //add the letterbox to each row
            row.appendChild(letterBox);
        }
        
        //adding each row onto the main-grid
        mainGrid.appendChild(row);
    }

}

newGame();


function createKeyboard() {
    const keyboard = document.getElementById('keyboard');

    const topKeys = document.createElement('div');
    topKeys.className = 'key-row';
    for (i = 0; i < 10; i++) {
        const key = document.createElement('button');
        key.id = topRow[i];
        key.className = 'key';
        key.textContent = topRow[i];

        key.addEventListener('click', function (e) {
            addLetter(e.target.id);
        });

        topKeys.appendChild(key);
    }

    keyboard.appendChild(topKeys);

    const middleKeys = document.createElement('div');
    middleKeys.className = 'key-row';
    for (i = 0; i < 9; i++) {
        const key = document.createElement('button');
        key.id = middleRow[i];
        key.className = 'key';
        key.textContent = middleRow[i];

        key.addEventListener('click', function (e) {
            addLetter(e.target.id);
        });

        middleKeys.appendChild(key);
    }

    keyboard.appendChild(middleKeys);

    const bottomKeys = document.createElement('div');
    bottomKeys.className = 'key-row';
    for (i = 0; i < 9; i++) {
        const key = document.createElement('button');
        key.id = bottomRow[i];
        key.className = 'key';
        key.textContent = bottomRow[i];

        key.addEventListener('click', function (e) {
            addLetter(e.target.id);
        });

        bottomKeys.appendChild(key);
    }

    keyboard.appendChild(bottomKeys);
}