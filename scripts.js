const boxes = document.querySelectorAll('.box');
const restart = document.querySelector('.restart');
const options = document.querySelectorAll('.pvp, .pve, .restart');
const pvp = document.querySelector('.pvp');
const pve = document.querySelector('.pve');

const Player = (name, symbol, isBot) => {
    return { name, symbol, isBot };
};

function playTurn(element, player) {
    element.innerText = player.symbol;
}

function gameWon(player) {
    return (
        (boxes[0].innerText === player.symbol && 
        ((boxes[3].innerText === player.symbol && 
        boxes[6].innerText === player.symbol) || 
        (boxes[4].innerText === player.symbol && 
        boxes[8].innerText === player.symbol) || 
        (boxes[1].innerText === player.symbol && 
        boxes[2].innerText === player.symbol))) || 
        (boxes[1].innerText === player.symbol && 
        boxes[4].innerText === player.symbol && 
        boxes[7].innerText === player.symbol) || 
        (boxes[2].innerText === player.symbol && 
        ((boxes[5].innerText === player.symbol && 
        boxes[8].innerText === player.symbol) || 
        (boxes[4].innerText === player.symbol && 
        boxes[6].innerText === player.symbol))) || 
        (boxes[3].innerText === player.symbol && 
        boxes[4].innerText === player.symbol && 
        boxes[5].innerText === player.symbol) || 
        (boxes[6].innerText === player.symbol && 
        boxes[7].innerText === player.symbol && 
        boxes[8].innerText === player.symbol)
    );
}

function botRandomTurn(player) {
    console.log("my turn!");
    let attempt = 1 + Math.floor(Math.random() * 8);
    while (boxes[attempt].innerText) {
        attempt = 1 + Math.floor(Math.random() * 8);
    }
    playTurn(boxes[attempt], player)
}

function restartGame() {
    for (let box of boxes) {
        box.innerText = '';
    }
    boxes.forEach((element) => {
        element.disabled = false;
    });
    currentPlayer = player1;
    otherPlayer = player2;
}

function displayWinner(player) {
    window.alert(`${player.name} wins!`);
}

let player1 = Player('Player 1', 'X', false);
let player2 = Player('Player 2', 'O', false);

let currentPlayer = player1;
let otherPlayer = player2;

boxes.forEach((element) => {
    element.addEventListener('click', () => {
        if (!element.innerText) {
            playTurn(element, currentPlayer);
            boxes.forEach((element) => {
                element.disabled = true;
            });
            if (otherPlayer.isBot) {
                options.forEach((element) => {
                    element.disabled = true;
                });
                if (!gameWon(currentPlayer)) {
                    setTimeout(() => {
                        botRandomTurn(otherPlayer);
                        if (!gameWon(otherPlayer)) {
                            boxes.forEach((element) => {
                                element.disabled = false;
                            });
                        } else {
                            setTimeout(() => {
                                displayWinner(otherPlayer);
                            }, 300);
                        }
                        options.forEach((element) => {
                            element.disabled = false;
                        });
                    }, 1000);
                } else {
                    options.forEach((element) => {
                        element.disabled = false;
                    });
                    setTimeout(() => {
                        displayWinner(currentPlayer);
                    }, 300);
                }
            } else {
                if (!gameWon(currentPlayer)) {
                    let temp = currentPlayer;
                    currentPlayer = otherPlayer;
                    otherPlayer = temp;
                    boxes.forEach((element) => {
                        element.disabled = false;
                    });
                } else {
                    setTimeout(() => {
                        displayWinner(currentPlayer);
                    }, 300);
                }
            }
            
        }
    });
});

restart.addEventListener('click', () => restartGame());

pvp.addEventListener('click', () => {
    restartGame();
    player1.isBot = false;
    player2.isBot = false;
});

pve.addEventListener('click', () => {
    restartGame();
    player1.isBot = false;
    player2.isBot = true;
});