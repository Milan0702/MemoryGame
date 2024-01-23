const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

const colors = ['red', 'pink','cyan', 'brown','orange', 'blue','purple', 'yellow','purple', 'orange', 'pink', 'brown','yellow','blue','cyan','red'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

// Create the game board
function createBoard() {
    for (let i = 0; i < colors.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}   

// Shuffle the cards
function shuffleCards() {
    for (let i = colors.length-1; i >0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
}

// Flip the card over
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(colors[cardId]);
    cardsChosenId.push(cardId);
    this.style.backgroundColor = colors[cardId];
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// Check if the cards match
function checkForMatch() {
    const cards = document.getElementsByClassName('card');
    const cardOneId = cardsChosenId[0];
    const cardTwoId = cardsChosenId[1];
    
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[cardOneId].style.backgroundColor = '#222';
        cards[cardTwoId].style.backgroundColor = '#222';
        cardsWon.push(cardsChosen);
    }
    else{
        cards[cardOneId].style.backgroundColor = '#ddd';
        cards[cardTwoId].style.backgroundColor = '#ddd';
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === colors.length / 2) {
        alert('Congratulations! You won the game!');
    }
}
// Reset the game
function resetGame() {
    gameBoard.innerHTML = '';
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    createBoard();
}
createBoard();
shuffleCards();
resetButton.addEventListener('click', resetGame);