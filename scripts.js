const boxes = document.querySelectorAll('.box');
const restart = document.querySelector('.restart');

const Player = (symbol) => {
    return { symbol };
};

function playTurn(element, player) {
    if (!element.innerText) {
        element.innerText = player.symbol;
    }
}

function gameOver(player) {
    if (
        boxes[0].innerText == player.symbol && 
        ((boxes[3].innerText == player.symbol && 
        boxes[6].innerText == player.symbol) || 
        (boxes[4].innerText == player.symbol && 
        boxes[8].innerText == player.symbol))
    ) {
        return true;
    } else if (
        boxes[1].innerText == player.symbol && 
        (boxes[4].innerText == player.symbol && 
        boxes[7].innerText == player.symbol)
    ) {
        return true;
    } else if (
        boxes[2].innerText == player.symbol && 
        ((boxes[5].innerText == player.symbol && 
        boxes[8].innerText == player.symbol) || 
        (boxes[4].innerText == player.symbol && 
        boxes[6].innerText == player.symbol))
    ) {
        return true;
    } else if (
        boxes[3].innerText == player.symbol && 
        (boxes[4].innerText == player.symbol && 
        boxes[5].innerText == player.symbol)
    ) {
        return true;
    }
    return false;
}

function botRandomTurn(player) {
    console.log("my turn!");
    let attempt = 1 + Math.floor(Math.random() * 8);
    while (boxes[attempt].innerText) {
        attempt = 1 + Math.floor(Math.random() * 8);
    }
    playTurn(boxes[attempt], player)
}

let player1 = Player('X');
let player2 = Player('O')

boxes.forEach((element) => {
    element.addEventListener('click', () => {
        playTurn(element, player1);
        if (!gameOver(player1)) {
            botRandomTurn(player2);
            gameOver(player2);
        }
    });
});

restart.addEventListener('click', () => {
    for (let box of boxes) {
        box.innerText = '';
    }
})