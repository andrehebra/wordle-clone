const numberOfAttempts = 6;
const wordLength = 5;

const mainGrid = document.getElementById('main-grid');


for (i = 1; i <= numberOfAttempts; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    row.id = 'row-' + i;

    for (j = 1; j <= wordLength; j++) {
        let letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.id = 'row-' + i + '-letter-' + j;

        letterBox.textContent = 'i';

        row.appendChild(letterBox);
    }
    
    mainGrid.appendChild(row);
}