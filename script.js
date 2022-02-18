//number of word guesses allowed
const numberOfAttempts = 6;
//length of the words that can be guessed
const wordLength = 5;

//finds the main grid in index.html
const mainGrid = document.getElementById('main-grid');

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

//event listener to catch each keystroke
window.addEventListener('keydown', function (e) {

    //change keys to uppercase
    const upperCase = e.key.toUpperCase();

    //check to see if keys pressed are from alphabet

    //add keystroke
    if (upperCase.match("^[a-zA-Z\(\)]+$") && upperCase.length == 1) {
        play(upperCase);
    } else if (upperCase == 'BACKSPACE') {
        backSpace();
    } else if (upperCase == 'ENTER') {
        submitWord();
    }
});

//add keystroke
function play(letter) {
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
