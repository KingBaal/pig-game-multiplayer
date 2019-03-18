let btnNewGame = document.getElementById('btn-new-game');
let btnDecreaseQuantityOfPlayes = document.getElementById('btn-decrease-quantity-of-players');
let btnIncreaseQuantityOfPlayes = document.getElementById('btn-increase-quantity-of-players');
let btnStartGame = document.getElementById('btn-start-game');


let divQuantityOfPlayers = document.getElementById('div-quantity-of-players');
let quantityOfPlayers = 1;

let playersDiceNumber = document.querySelectorAll('.my-flex-container .my-flex-block .players-info .players-dice-number');
let arrPlayersDiceNumber = [...playersDiceNumber];

let playersMovePoints = document.querySelectorAll('.my-flex-container .my-flex-block .players-info .players-move-points');
let arrPlayersMovePoints = [...playersMovePoints];

let playersAllPoints = document.querySelectorAll('.my-flex-container .my-flex-block .players-info .players-all-points');
let arrPlayersAllPoints = [...playersAllPoints];

let btnsDiceroll = document.querySelectorAll('.my-flex-container .my-flex-block .players-info .btns-dice-roll');
let arrbtnsDiceroll = [...btnsDiceroll];

let btnsSave = document.querySelectorAll('.my-flex-container .my-flex-block .players-info .btns-save');
let arrbtnsSave = [...btnsSave];

let playersInfo = document.querySelectorAll('.my-flex-container .my-flex-block .players-info');
let arrPlayersInfo = [...playersInfo]


let currentUserId = 0;
let currentUserScores = 0;

let users = {
    0 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[0],
        divMovePoints : arrPlayersMovePoints[0],
        divAllPoints : arrPlayersAllPoints[0],
        btnRoll : arrbtnsDiceroll[0],
        btnSave : arrbtnsSave[0],
        playerName: 'player-1'
    },
    1 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[1],
        divMovePoints : arrPlayersMovePoints[1],
        divAllPoints : arrPlayersAllPoints[1],
        btnRoll : arrbtnsDiceroll[1],
        btnSave : arrbtnsSave[1],
        playerName: 'player-2'
    },
    2 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[2],
        divMovePoints : arrPlayersMovePoints[2],
        divAllPoints : arrPlayersAllPoints[2],
        btnRoll : arrbtnsDiceroll[2],
        btnSave : arrbtnsSave[2],
        playerName: 'player-3'
    }, 
    3 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[3],
        divMovePoints : arrPlayersMovePoints[3],
        divAllPoints : arrPlayersAllPoints[3],
        btnRoll : arrbtnsDiceroll[3],
        btnSave : arrbtnsSave[3],
        playerName: 'player-4'
    },
    4 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[4],
        divMovePoints : arrPlayersMovePoints[4],
        divAllPoints : arrPlayersAllPoints[4],
        btnRoll : arrbtnsDiceroll[4],
        btnSave : arrbtnsSave[4],
        playerName: 'player-5'
    },
    5 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[5],
        divMovePoints : arrPlayersMovePoints[5],
        divAllPoints : arrPlayersAllPoints[5],
        btnRoll : arrbtnsDiceroll[5],
        btnSave : arrbtnsSave[5],
        playerName: 'player-6'
    },
    6 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[6],
        divMovePoints : arrPlayersMovePoints[6],
        divAllPoints : arrPlayersAllPoints[6],
        btnRoll : arrbtnsDiceroll[6],
        btnSave : arrbtnsSave[6],
        playerName: 'player-7'
    },
    7 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[7],
        divMovePoints : arrPlayersMovePoints[7],
        divAllPoints : arrPlayersAllPoints[7],
        btnRoll : arrbtnsDiceroll[7],
        btnSave : arrbtnsSave[7],
        playerName: 'player-8'
    },
    8 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[8],
        divMovePoints : arrPlayersMovePoints[8],
        divAllPoints : arrPlayersAllPoints[8],
        btnRoll : arrbtnsDiceroll[8],
        btnSave : arrbtnsSave[8],
        playerName: 'player-9'
    },
    9 : {
        userScores : 0,
        divNumber : arrPlayersDiceNumber[9],
        divMovePoints : arrPlayersMovePoints[9],
        divAllPoints : arrPlayersAllPoints[9],
        btnRoll : arrbtnsDiceroll[9],
        btnSave : arrbtnsSave[9],
        playerName: 'player-10'
    }
};

let bones = document.querySelectorAll('.my-flex-container .my-flex-block .bones img');
let arrBones = [...bones]; // convert nodelist to array

function removeShowedClass() {
    arrBones.forEach( item => item.classList.remove('showed') );
}

function enableCurrentUserButttons() {
    users[currentUserId].btnRoll.disabled = false;
    users[currentUserId].btnSave.disabled = false;
}

function disableCurrentUserButttons() {
    users[currentUserId].btnRoll.disabled = true;
    users[currentUserId].btnSave.disabled = true;
}

function changeCurrentUserId() {
    if (currentUserId === quantityOfPlayers) {
        currentUserId = 0;
    } else {
        currentUserId++;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function roll(userId) {
    btnNewGame.disabled = false;
    removeShowedClass();
    let currUser = users[userId];
    let currentNumber = getRandomInt(1, 6);
    currUser.divNumber.innerHTML = `This roll points =  ${currentNumber}`;
    
    if (currentNumber === 1) {
        currentUserScores = 0;
        currUser.divNumber.innerHTML = `This roll points = 0`;
        currUser.divMovePoints.innerHTML = 'This move points = 0';
        toast('Oops, it\'s 1.', 'Next player turn.', 'one', 3000);
        toast(`${currUser.playerName}`, 'Oops, it\'s 1.', currUser.playerName, 20000);
        disableCurrentUserButttons();
        changeCurrentUserId();
        enableCurrentUserButttons();
    } else {
        currentUserScores += currentNumber;
        currUser.divMovePoints.innerHTML = `This move points = ${currentUserScores}`;
        toast(`${currUser.playerName}`, `You have -  ${currentNumber}`, currUser.playerName, 20000);
    }
    arrBones[currentNumber].classList.add('showed');
}

function save(userId) {
    let currUser = users[userId];
    currUser.userScores += currentUserScores;
    currUser.divAllPoints.innerHTML = `All points = ${currUser.userScores}`;

    if (currUser.userScores >= 100) {
        toast('You win!', `Your score = ${currUser.userScores}`, 'win', 10000);
        modal.open();
        disableCurrentUserButttons();
    } else {
        toast('Next player turn.', 'You save points.', 'save', 3000);
        toast(`${currUser.playerName} score - ${currUser.userScores}`, 
              `This move points = ${currentUserScores}`, currUser.playerName, 20000);
        disableCurrentUserButttons();
        changeCurrentUserId();
        enableCurrentUserButttons();
    }
    currentUserScores = 0;
    currUser.divNumber.innerHTML = 'This roll points = 0';
    currUser.divMovePoints.innerHTML = 'This move points = 0';
}

function btnRestart() {
    for (i = 0; i < Object.keys(users).length; i++) {  
        users[i].divNumber.innerHTML = 'This roll points = 0';
        users[i].divMovePoints.innerHTML = 'This move points = 0';
        users[i].userScores = 0;
        users[i].divAllPoints.innerHTML = 'All points = 0';
    }
    btnNewGame.disabled = true;
    arrbtnsDiceroll[currentUserId].disabled = true;
    arrbtnsSave[currentUserId].disabled = true;
    if (quantityOfPlayers === 1) {
        btnDecreaseQuantityOfPlayes.disabled = true;
        btnIncreaseQuantityOfPlayes.disabled = false;
    } else if (quantityOfPlayers === 9) {
        btnIncreaseQuantityOfPlayes.disabled = true;
        btnDecreaseQuantityOfPlayes.disabled = false;
    } else {
        btnDecreaseQuantityOfPlayes.disabled = false;
        btnIncreaseQuantityOfPlayes.disabled = false;
    }
    btnStartGame.disabled = false;
    currentUserId = 0;
}

function decreaseQuantityOfPlayes() {
    arrPlayersInfo[quantityOfPlayers].classList.remove('in-game');   
    if (quantityOfPlayers === 2) {
        btnDecreaseQuantityOfPlayes.disabled = true;
        --quantityOfPlayers;
        divQuantityOfPlayers.innerHTML =  quantityOfPlayers + 1;

    } else {
        btnIncreaseQuantityOfPlayes.disabled = false;
        --quantityOfPlayers;
        divQuantityOfPlayers.innerHTML = quantityOfPlayers + 1;
    }
}

function increaseQuantityOfPlayes() {
    if (quantityOfPlayers === 8) {
        btnIncreaseQuantityOfPlayes.disabled = true;
        ++quantityOfPlayers;
        divQuantityOfPlayers.innerHTML = quantityOfPlayers + 1;
    } else {
        btnDecreaseQuantityOfPlayes.disabled = false;
        ++quantityOfPlayers;
        divQuantityOfPlayers.innerHTML = quantityOfPlayers + 1;
    }
    arrPlayersInfo[quantityOfPlayers].classList.add('in-game');  
    console.log(arrPlayersInfo[quantityOfPlayers]); 
}

function startGame() {
    arrbtnsDiceroll[currentUserId].disabled = false;
    arrbtnsSave[currentUserId].disabled = false;
    btnStartGame.disabled = true;
    btnDecreaseQuantityOfPlayes.disabled = true;
    btnIncreaseQuantityOfPlayes.disabled = true;
}

function btnRoll() {
    roll(currentUserId);
    
}

function btnSave() {
    save(currentUserId);
}

function toast(title, text, type, timeout) {
    VanillaToasts.create({
        title,
        text,
        type,
        timeout
    });
}

btnNewGame.addEventListener('click', btnRestart);

btnDecreaseQuantityOfPlayes.addEventListener('click', decreaseQuantityOfPlayes);
btnIncreaseQuantityOfPlayes.addEventListener('click', increaseQuantityOfPlayes);

btnStartGame.addEventListener('click', startGame);

for (let i = 0; i < arrbtnsDiceroll.length; i++) {
    arrbtnsDiceroll[i].addEventListener('click', btnRoll);
}

for (let i = 0; i < arrbtnsSave.length; i++) {
    arrbtnsSave[i].addEventListener('click', btnSave);
}

let modal = new tingle.modal({  // instanciate new modal
    footer : true,
    closeMethods : ['overlay', 'button', 'escape'],
    cssClass : ['custom-class-1', 'custom-class-2']
});

modal.setContent('<h1>You win bro !!!</h1>');  // set content
modal.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', () => modal.close() ); // add btn
