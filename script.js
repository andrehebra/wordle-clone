const numberOfAttempts = 6;
const wordLength = 5;

const mainGrid = document.getElementById('main-grid');


for (i = 1; i <= numberOfAttempts; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    row.id = 'row-' + i;
    row.setAttribute('played', 'false');

    for (j = 1; j <= wordLength; j++) {
        let letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.id = 'row-' + i + '-letter-' + j;
        letterBox.setAttribute('played', 'false');

        letterBox.textContent = '';

        row.appendChild(letterBox);
    }
    
    mainGrid.appendChild(row);
}

window.addEventListener('keydown', function (e) {
    console.log(e);

    console.log(e.key.toUpperCase());

    play(e.key.toUpperCase())

});

function play(letter) {
    for (i = 1; i <= numberOfAttempts; i++) {
        if (document.getElementById('row-' + i).getAttribute('played') == 'false') {
            
            for (j = 1; j <= wordLength; j++) {
                const currentLetter = document.getElementById('row-' + i + '-letter-' + j);
                if (currentLetter.getAttribute('played') == 'false') {
                    currentLetter.innerText = letter;
                    currentLetter.setAttribute('played', 'true');
                    return;
                }
            }

        } else {
            console.log('didnotwork...');
        }
    }
}