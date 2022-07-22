const play = document.querySelectorAll('button');
const playerScore = document.querySelector('[data-id="player-score"]');
const computerScore = document.querySelector('[data-id="computer-score"]');
const playerImg = document.querySelector('[data-id="player-img"]');
const computerImg = document.querySelector('[data-id="computer-img"]');
const winner = document.querySelector('.winner');
const playAgain = document.querySelector('[data-id="play-again"]');

// * set all images into array
const arr = ['papper.jpg', 'rock.png', 'scissors.png'];
let pScore = 0;
let cScore = 0;

// * add event listener on all buttons
addEvent();
function addEvent() {
    for (let i = 0; i < play.length; i++) {
        play[i].addEventListener('click', playGame);
    }
}

function playGame() {
    const computerRandom = Math.floor(Math.random() * arr.length);

    // * set proper img for computer random choese
    computerImg.src = 'img/' + arr[computerRandom];

    // * take the user's choice and set the appropriate image and score accordingly
    if (this.getAttribute('data-id') === 'papper') {
        playerImg.src = 'img/' + arr[0];
        if (computerRandom === 1) {
            pScore++;
        } else if (computerRandom === 2) {
            cScore++;
        } else return;
    } else if (this.getAttribute('data-id') === 'rock') {
        playerImg.src = 'img/' + arr[1];
        if (computerRandom === 0) {
            cScore++;
        } else if (computerRandom === 2) {
            pScore++;
        } else return;
    } else if (this.getAttribute('data-id') === 'scissors') {
        playerImg.src = 'img/' + arr[2];
        if (computerRandom === 0) {
            pScore++;
        } else if (computerRandom === 1) {
            cScore++;
        } else return;

        // * if the user chooses random, upload the corresponding image, compare with the computer's choice and increase the score
    } else {
        const playerRandom = Math.floor(Math.random() * arr.length);

        playerImg.src = 'img/' + arr[playerRandom];
        if (playerRandom === 0 && computerRandom === 1 || playerRandom === 1 && computerRandom === 2 || playerRandom === 2 && computerRandom === 0) {
            pScore++;
        } else if (playerRandom === 1 && computerRandom === 0 || playerRandom === 2 && computerRandom === 1 || playerRandom === 0 && computerRandom === 2) {
            cScore++;
        } else return;
    }

    // * always check if the user or computer has reached 5 points
    if (pScore === 5 || cScore === 5) {

        // * if so, remove events from buttons
        for (let i = 0; i < play.length; i++) {
            play[i].removeEventListener('click', playGame);
        }

        // * display the appropriate message
        pScore > cScore ? winner.textContent = 'Winner is player!' : winner.textContent = 'Winner is computer!';

        winner.style.display = 'block';
        playAgain.style.display = 'block';

        // * add event to play again button where reset all scores and give events on all others buttons
        playAgain.addEventListener('click', function () {
            pScore = 0;
            cScore = 0;
            winner.style.display = 'none';
            playAgain.style.display = 'none';
            playerScore.textContent = pScore;
            computerScore.textContent = cScore;
            addEvent();
        });
    }

    // * always update and display general scores
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
}