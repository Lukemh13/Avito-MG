const cards = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐯', '🦁', '🐵','🐱', '🐶', '🐰', '🦊', '🐼', '🐯', '🦁', '🐵'];

    let flippedCards = [];
    let matchedCards = [];
    let countdown = 30;
    let score = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }



    function createGameBoard() {
        const gameContainer = document.getElementById('game-container');
        const gameBoard = document.getElementById('game-board');
        const timerElement = document.getElementById('timer');


        shuffleArray(cards);

        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.card = card;
            cardElement.dataset.index = index;
            cardElement.textContent = "?";
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });

        showCards();
        const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown < 10 ? '0' + countdown : countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            hideCards();
            clicksBlocked = false;
            enableCardClick();
        } else if (countdown === 10) {
            timerElement.style.color = 'red'; 
        }
      }, 1000);
    }

    

    function showCards() {
        document.querySelectorAll('.card').forEach(card => {
            card.textContent = card.dataset.card;
            card.style.backgroundColor = '#fff';
        });
    }

    function hideCards() {
        document.querySelectorAll('.card').forEach(card => {
            card.textContent = 'MG';
            card.style.backgroundColor = '#ddd';
        });
    }

    function enableCardClick() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (clicksBlocked) {
            return; // Do nothing if clicks are blocked
        }
        const selectedCard = this;

        if (flippedCards.length < 2 && !flippedCards.includes(selectedCard)) {
            selectedCard.textContent = selectedCard.dataset.card;
            selectedCard.style.backgroundColor = '#fff';
            flippedCards.push(selectedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.card === card2.dataset.card) {
            matchedCards.push(card1, card2);
            score += 10; // Increment the score for each correct match
            document.getElementById('score-value').textContent = score;
            if (matchedCards.length === cards.length) {
                alert('Congratulations! You matched all the cards.');
            }
        } else {
            card1.textContent = 'MG';
            card2.textContent = 'MG';
            card1.style.backgroundColor = '#ddd';
            card2.style.backgroundColor = '#ddd';
        }

        flippedCards = [];
    }



    createGameBoard();