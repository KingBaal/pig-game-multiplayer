let modalEndGame;
let modalStartGame = new tingle.modal({
    closeMethods: [],
    cssClass: ['start-game-modal'],
    onOpen: onNewGameModalOpen,
    onClose: onNewGameModalClose
});

let btnNewGame = document.getElementById('btn-new-game');

let usersWrapper = document.querySelector('.pig-game-users-wrapper');
let users = {};
let ChangeUsersNameWrapper;

let quantityOfPlayers = 1;
let currentUserId = 0;
let currentUserScores = 0;
let PointsToWin = 100;

let bones = document.querySelectorAll('.bones img');
let arrBones = [...bones]; // convert nodelist to array

let btnDecreaseQuantityOfPlayes, btnIncreaseQuantityOfPlayes, btnCreateUsers, btnSaveUsersNames, btnStartGame, divQuantityOfPlayers;

const keys = {
    upArrowKey:  '38',
    wKey: '87',
    downArrowKey: '40',
    sKey: '83',
    cKey: '67',
    enterKey: '13',
    nKey: '78'
};

btnNewGame.addEventListener('click', onNewGameBtnClick);

modalStartGame.setContent( createStartMenu() );
modalStartGame.open();

window.addEventListener('keydown', onKeyDown);

function removeShowedClassFromBonesImgs() {
    arrBones.forEach( item => item.classList.remove('showed') );
}

function enableCurrentUserButttons() {
    users[currentUserId].btnDice.disabled = false;
}

function disableCurrentUserButttons() {
    users[currentUserId].btnDice.disabled = true;
    users[currentUserId].btnSave.disabled = true;
}

function changeCurrentUserId() {
    if (currentUserId === quantityOfPlayers) {
        currentUserId = 0;
    } else {
        currentUserId++;
    }
}

function onDiceRollBtnUserClick(userId) {
    btnNewGame.disabled = false;
    users[currentUserId].btnSave.disabled = false;
    removeShowedClassFromBonesImgs();
    let currUser = users[userId];
    let currentNumber = getRandomInt(1, 6);
    currUser.divDiceNumber.innerHTML = `This roll points =  ${currentNumber}`;

    if (currentNumber === 1) {
        currentUserScores = 0;
        currUser.divDiceNumber.innerHTML = `This roll points = 0`;
        currUser.divMovePoints.innerHTML = 'This move points = 0';
        toast('Oops, it\'s 1.', 'Next player turn.', 'one', 3000);
        toast(`player-${currentUserId + 1}`, 'Oops, it\'s 1.', `player-${currentUserId + 1}`, 20000);
        disableCurrentUserButttons();
        changeCurrentUserId();
        enableCurrentUserButttons();
    } else {
        currentUserScores += currentNumber;
        currUser.divMovePoints.innerHTML = `This move points = ${currentUserScores}`;
        toast(`player-${currentUserId + 1}`, `You have -  ${currentNumber}`, `player-${currentUserId + 1}`, 20000);
    }
    arrBones[currentNumber].classList.add('showed');
}

function onSaveBtnUserClick(userId) {
    let currUser = users[userId];
    currUser.userScores += currentUserScores;
    currUser.divAllPoints.innerHTML = `All points = ${currUser.userScores}`;

    if (currUser.userScores >= PointsToWin) {
        toast('You win!', `Your score = ${currUser.userScores}`, 'win', 10000);
        createEndGameModal();
        modalEndGame.open();
        disableCurrentUserButttons();
    } else {
        toast('Next player turn.', 'You save points.', 'save', 3000);
        toast(`${currentUserId + 1} score - ${currUser.userScores}`, 
              `This move points = ${currentUserScores}`, `player-${currentUserId + 1}`, 20000);
        disableCurrentUserButttons();
        changeCurrentUserId();
        enableCurrentUserButttons();
    }
    currentUserScores = 0;
    currUser.divDiceNumber.innerHTML = 'This roll points = 0';
    currUser.divMovePoints.innerHTML = 'This move points = 0';
}

function removeUsers() {
    for (let user in users) {
        usersWrapper.removeChild(users[user].userDiv);
    }
    currentUserScores = 0;
    users = {};
    currentUserId = 0;
}

function createUser(userId) {
    let userDiv = document.createElement('div');

    userDiv.classList.add('user');
    userDiv.id = `user_${userId}`;

    let userNameWrapper = document.createElement('div');
    let userNameSpan = document.createElement('span');
    let userBtnsDiv = document.createElement('div');
    let userBtnDice = document.createElement('button');
    let userBtnSave = document.createElement('button');
    let userInfoDiv = document.createElement('div');
    let userDivDiceNumber = document.createElement('div');
    let userDivMovePoints = document.createElement('div');
    let userDivAllPoints = document.createElement('div');

    userNameWrapper.classList.add('user-name-wrapper')
    userNameSpan.classList.add('user-name-span');
    userInfoDiv.classList.add('user-info-div');
    userDivDiceNumber.classList.add('user-div-dice-number');
    userDivMovePoints.classList.add('user-div-move-points');
    userDivAllPoints.classList.add('user-div-all-points');
    userBtnsDiv.classList.add('user-btns');
    userBtnDice.classList.add('btn');
    userBtnSave.classList.add('btn');
    userBtnDice.id = 'user-btn-dice';
    userBtnSave.id = 'user-btn-save'

    userNameWrapper.appendChild(userNameSpan);
    userDiv.appendChild(userNameWrapper);
    userDiv.appendChild(userInfoDiv);
    userInfoDiv.appendChild(userDivDiceNumber);
    userInfoDiv.appendChild(userDivMovePoints);
    userInfoDiv.appendChild(userDivAllPoints);
    userDiv.appendChild(userBtnsDiv);
    userBtnsDiv.appendChild(userBtnDice);
    userBtnsDiv.appendChild(userBtnSave);

    let userWrapper = usersWrapper.appendChild(userDiv);
    userNameSpan.innerHTML = `Player ${userId + 1}`;
    userBtnDice.innerHTML = 'Dice roll';
    userBtnSave.innerHTML = 'Save';
    userBtnDice.disabled = true;
    userBtnSave.disabled = true;
    userDivDiceNumber.innerHTML = 'This roll points = 0';
    userDivMovePoints.innerHTML = 'This move points = 0';
    userDivAllPoints.innerHTML = 'All points = 0';
    userBtnDice.addEventListener('click', () => onDiceRollBtnUserClick(currentUserId) );
    userBtnSave.addEventListener('click', () => onSaveBtnUserClick(currentUserId) );

    let resObj = {
        userScores : 0,
        nameSpan: userWrapper.querySelector('.pig-game-users-wrapper .user-name-span'),
        btnDice : userWrapper.querySelector('.pig-game-users-wrapper #user-btn-dice'),
        btnSave : userWrapper.querySelector('.pig-game-users-wrapper #user-btn-save'),
        divDiceNumber : userWrapper.querySelector('.pig-game-users-wrapper .user-div-dice-number'),
        divMovePoints : userWrapper.querySelector('.pig-game-users-wrapper .user-div-move-points'),
        divAllPoints : userWrapper.querySelector('.pig-game-users-wrapper .user-div-all-points'),
        userDiv
    };
    return resObj;
}

function createStartMenu() {
    let startDiv = document.createElement('div');
    let startHeadlineWrapper = document.createElement('div');
    let startHeadlineSpan = document.createElement('span');

    let flexContainer = document.createElement('div');
    let startChooseFlexBlock = document.createElement('div');
    let startChooseDiv = document.createElement('div');
    let startBtnRemoveUser = document.createElement('button');
    let startNumberOfUsers = document.createElement('span');
    let startBtnAddUser = document.createElement('button');
    let startCreateUsersBtn = document.createElement('button');
    let startChangeUsersNameFlexBlock = document.createElement('div');

    let startBtnNewGameWrapper = document.createElement('div'); 
    let startBtnNewGame = document.createElement('button');

    startDiv.classList.add('start-div');
    startHeadlineWrapper.classList.add('start-headline-wrapper');
    startHeadlineSpan.classList.add('headline-span');
    startHeadlineSpan.innerHTML = 'Choose quantity of players';

    flexContainer.classList.add('flex-container');
    startChooseFlexBlock.classList.add('start-choose-Flex-block');
    startChooseDiv.classList.add('start-choose-div');
    startBtnRemoveUser.classList.add('btn');
    startBtnRemoveUser.id = 'btn-remove-user';
    startBtnRemoveUser.innerHTML = '-';
    startBtnRemoveUser.disabled = true;
    startNumberOfUsers.id = 'number-of-users-span';
    startNumberOfUsers.innerHTML = `${quantityOfPlayers + 1} players`;
    startBtnAddUser.classList.add('btn');
    startBtnAddUser.id = 'btn-add-user';
    startBtnAddUser.innerHTML = '+';
    startCreateUsersBtn.classList.add('btn');
    startCreateUsersBtn.id = 'btn-create-users';
    startCreateUsersBtn.innerHTML = 'Create';
    startChangeUsersNameFlexBlock.classList.add('start-change-user-name-flex-block');

    startBtnNewGameWrapper.classList.add('start-btn-new-game-wrapper');
    startBtnNewGame.classList.add('btn');
    startBtnNewGame.id = 'btn-start-game';
    startBtnNewGame.innerHTML = 'Start game';

    startDiv.appendChild(startHeadlineWrapper);
    startDiv.appendChild(flexContainer);
    startDiv.appendChild(startBtnNewGameWrapper);

    startHeadlineWrapper.appendChild(startHeadlineSpan);

    flexContainer.appendChild(startChooseFlexBlock);
    startChooseFlexBlock.appendChild(startChooseDiv);
    startChooseDiv.appendChild(startBtnRemoveUser);
    startChooseDiv.appendChild(startNumberOfUsers);
    startChooseDiv.appendChild(startBtnAddUser);
    startChooseFlexBlock.appendChild(startCreateUsersBtn);
    flexContainer.appendChild(startChangeUsersNameFlexBlock);

    startBtnNewGameWrapper.appendChild(startBtnNewGame);
    return startDiv;
}

function createChangeUsersNameDiv() {
    let changeUsersNameDiv = document.createElement('div');

    let changeUsersNameHeadlineDiv = document.createElement('div');
    let changeUsersNameHeadlineSpan = document.createElement('span');

    let usersNameDiv = document.createElement('div');

    changeUsersNameDiv.classList.add('change-users-name-div');
    changeUsersNameHeadlineDiv.classList.add('change-users-name-headline-div');
    changeUsersNameHeadlineSpan.classList.add('change-users-name-headline-span');
    changeUsersNameHeadlineSpan.innerHTML = 'Change names if u want';

    usersNameDiv.classList.add('users-name-div');
    for (let i = 0; i <= quantityOfPlayers; i++) {
        let userNameDiv = document.createElement('div');
        let userNumberSpan = document.createElement('span');
        let usernameInput = document.createElement('input');

        userNameDiv.classList.add('user-name-div');
        userNumberSpan.classList.add('user-number-span');
        usernameInput.classList.add('user-name-input');
        usernameInput.id = `user-${i+1}`;
        usernameInput.required = true;

        userNumberSpan.innerHTML = `Player ${i+1}. `;
        usernameInput.value = `${users[i].nameSpan.innerHTML}`;

        usernameInput.addEventListener('input' , () => {
            !usernameInput.validity.valid || !usernameInput.value.trim() ? btnStartGame.disabled = true :
            btnStartGame.disabled = false;
        });

        usersNameDiv.appendChild(userNameDiv);
        userNameDiv.appendChild(userNumberSpan);
        userNameDiv.appendChild(usernameInput);
    }

    changeUsersNameDiv.appendChild(changeUsersNameHeadlineDiv);
    changeUsersNameHeadlineDiv.appendChild(changeUsersNameHeadlineSpan);

    changeUsersNameDiv.appendChild(usersNameDiv);

    console.log(changeUsersNameDiv);
    return changeUsersNameDiv;
}

function onNewGameBtnClick() {
    modalStartGame.open();   
    removeShowedClassFromBonesImgs(); 
    removeUsers();
    btnNewGame.disabled = true;
    btnDecreaseQuantityOfPlayes.disabled = false;
    btnIncreaseQuantityOfPlayes.disabled = false;
    if (quantityOfPlayers === 1) {
        btnDecreaseQuantityOfPlayes.disabled = true;
    } else if (quantityOfPlayers === 9) {
        btnIncreaseQuantityOfPlayes.disabled = true;
    }
}

function onDecreaseQuantityOfPlayesBtnClick() {
    quantityOfPlayers === 2 ? btnDecreaseQuantityOfPlayes.disabled = true :
        btnIncreaseQuantityOfPlayes.disabled = false;

    quantityOfPlayers--;
    divQuantityOfPlayers.innerHTML = `${quantityOfPlayers + 1} players`;
}

function onIncreaseQuantityOfPlayesBtnClick() {
    quantityOfPlayers === 8 ? btnIncreaseQuantityOfPlayes.disabled = true :
        btnDecreaseQuantityOfPlayes.disabled = false;

    quantityOfPlayers++;
    divQuantityOfPlayers.innerHTML = `${quantityOfPlayers + 1} players`;
}

function onCreateUsersBtnClick() {
    btnStartGame.disabled = false;
    for (let i = 0; i <= quantityOfPlayers; i++) {
        users[i] = createUser(i);
    }
    btnCreateUsers.disabled = true;
    btnDecreaseQuantityOfPlayes.disabled = true;
    btnIncreaseQuantityOfPlayes.disabled = true;
    ChangeUsersNameWrapper = document.querySelector('.start-change-user-name-flex-block');
    ChangeUsersNameWrapper.appendChild( createChangeUsersNameDiv() );
}

function onSaveNamesBtnClick() {
    for (let i = 0; i <= quantityOfPlayers; i++) {
        let usernameInput = document.querySelector(`#user-${i+1}`);
        users[i].nameSpan.innerHTML = usernameInput.value;
        console.log(usernameInput);
    }
}

function onStartGameBtnClick() {
    onSaveNamesBtnClick();
    // btnCreateUsers.disabled = false;
    users[currentUserId].btnDice.disabled = false;
    modalStartGame.close();
    ChangeUsersNameWrapper.innerHTML = '';
}

function setAndGetGameResultsDiv() {
    let gameResultsDiv = document.createElement('div');
    let gameResultsFlexContainer = document.createElement('div');
    let gameWinnerFlexBlock = document.createElement('div');
    let gameWinnerSpan = document.createElement('span');
    let gameStatisticFlexBlock = document.createElement('div');
    let gameStatisticDiv = document.createElement('div');
    let statisticHeadlineSpan = document.createElement('span');
    let statisticHeadlineDiv = document.createElement('div');
    let statisticUsersDiv = document.createElement('div');
    gameResultsDiv.classList.add('game-results-div');
    gameResultsFlexContainer.classList.add('game-results-flex-container');
    gameWinnerFlexBlock.classList.add('game-winner-flex-block');
    gameWinnerSpan.classList.add('game-winner-span');
    gameStatisticFlexBlock.classList.add('game-statistic-flex-block');
    gameStatisticDiv.classList.add('game-statistic-div');
    statisticHeadlineDiv.classList.add('statistic-headline-div');
    statisticHeadlineSpan.classList.add('statistic-headline-span');
    statisticHeadlineSpan.innerHTML = 'Statistic:';
    statisticUsersDiv.classList.add('statistic-user-div');
    gameResultsDiv.appendChild(gameResultsFlexContainer);
    gameResultsFlexContainer.appendChild(gameWinnerFlexBlock);
    gameWinnerFlexBlock.appendChild(gameWinnerSpan);
    gameResultsFlexContainer.appendChild(gameStatisticFlexBlock);
    gameStatisticFlexBlock.appendChild(gameStatisticDiv);
    gameStatisticDiv.appendChild(statisticHeadlineDiv);
    statisticHeadlineDiv.appendChild(statisticHeadlineSpan);
    gameStatisticDiv.appendChild(statisticUsersDiv);
    for (let key of Object.keys(users)) {
        let userResultsDiv = document.createElement('div');
        let userNameSpan = document.createElement('span');
        let userPointsSpan = document.createElement('span');
        userResultsDiv.classList.add('user-statistic');
        userResultsDiv.id = `user-${+key+1}`;
        userNameSpan.classList.add('user-name-span');
        userPointsSpan.classList.add('user-points-span');
        userNameSpan.innerHTML = `Player ${+key+1}:`;
        userPointsSpan.innerHTML = ` ${users[key].userScores} points.`;
        statisticUsersDiv.appendChild(userResultsDiv);
        userResultsDiv.appendChild(userNameSpan);
        userResultsDiv.appendChild(userPointsSpan);
        if ( users[key].userScores >= PointsToWin) {
            gameWinnerSpan.innerHTML = `Player ${+key+1} win!`;
        }
    }
    let FooterDiv = document.createElement('div');
    FooterDiv.classList.add('game-results-footer-div')
    let gameResultsBtnNewGame = document.createElement('button');
    gameResultsBtnNewGame.classList.add('btn');
    gameResultsBtnNewGame.id = 'btn-new-game';
    gameResultsBtnNewGame.innerHTML = 'New game';
    gameResultsDiv.appendChild(FooterDiv);  
    FooterDiv.appendChild(gameResultsBtnNewGame); 
    return gameResultsDiv;
}

function onEndGameModalOpen() {
    modalEndGame.setContent( setAndGetGameResultsDiv() );
    let modalEndGameBtnNewGame = document.querySelector('.end-game-modal #btn-new-game');
    modalEndGameBtnNewGame.addEventListener('click', () => {
        onNewGameBtnClick();
        this.destroy();
    }); 
}

function onNewGameModalOpen() {
    console.log('modalStartGame on open ', this);
    btnDecreaseQuantityOfPlayes = document.querySelector('.start-game-modal #btn-remove-user');
    divQuantityOfPlayers = document.querySelector('.start-game-modal #number-of-users-span');
    btnIncreaseQuantityOfPlayes = document.querySelector('.start-game-modal #btn-add-user');
    btnCreateUsers = document.querySelector('.start-game-modal #btn-create-users');
    btnStartGame = document.querySelector('.start-game-modal #btn-start-game');
    btnDecreaseQuantityOfPlayes.addEventListener('click', onDecreaseQuantityOfPlayesBtnClick);
    btnIncreaseQuantityOfPlayes.addEventListener('click', onIncreaseQuantityOfPlayesBtnClick);
    btnCreateUsers.addEventListener('click', onCreateUsersBtnClick);

    btnCreateUsers.disabled = false;
    btnStartGame.disabled = true;
    btnStartGame.addEventListener('click', onStartGameBtnClick);
}

function onNewGameModalClose() {
    btnDecreaseQuantityOfPlayes.removeEventListener('click', onDecreaseQuantityOfPlayesBtnClick);
    btnIncreaseQuantityOfPlayes.removeEventListener('click', onIncreaseQuantityOfPlayesBtnClick);
    btnCreateUsers.removeEventListener('click', onCreateUsersBtnClick);
    btnStartGame.removeEventListener('click', onStartGameBtnClick);
}

function createEndGameModal() {
    modalEndGame = new tingle.modal({
        closeMethods : ['button', 'escape'],
        cssClass : ['end-game-modal'],
        onOpen: onEndGameModalOpen
    });
}

function onKeyDown(e) {
    if ( (e.keyCode == keys.wKey || e.keyCode == keys.upArrowKey) && btnIncreaseQuantityOfPlayes.disabled == false ) {
        onIncreaseQuantityOfPlayesBtnClick();
    } else if ( (e.keyCode == keys.sKey || e.keyCode == keys.downArrowKey) && btnDecreaseQuantityOfPlayes.disabled == false) {
        onDecreaseQuantityOfPlayesBtnClick();
    } else if (e.keyCode == keys.cKey && btnCreateUsers.disabled == false) {
        onCreateUsersBtnClick();
    } else if (e.keyCode == keys.enterKey && btnStartGame.disabled == false) {
            onStartGameBtnClick();
    } else if (e.keyCode == keys.nKey && btnNewGame.disabled == false) {
            onNewGameBtnClick();
    }    
    console.log(e.keyCode);
        // keys[e.keyCode]();
}