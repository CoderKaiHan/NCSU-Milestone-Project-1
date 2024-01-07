//Global variables
const playArea = document.querySelector
('#play-area');

const startButton = document.getElementById('start-button');

const player1 = document.getElementById('player1');

const player2 = document.getElementById('player2');

const dragon1 = document.getElementById('dragon1');

const dragon2 = document.getElementById('dragon2');

const gameTimer = document.getElementById('game-timer');

const targetsArray = [];

const targetsPointsDisplay = document.createElement('div');

const bgMusic = document.getElementById('bgMusic');

let player1Score=  0;
let player2Score = 0;
let targetsPoints;
let newTarget = true;
let addPoints = true;
let newGame = true;
let soundEffect = false;


//Set initial players & dragons position in js
player1.style.top = '240px';
player1.style.left = '100px';
player2.style.top = '240px';
player2.style.left = '740px';
dragon1.style.top = '270px';
dragon1.style.left = '65px';
dragon2.style.top = '270px';
dragon2.style.left = '735px';


//Players & dragons move control function
function playersControls (event) {
    // Get player1 & dragon1 current position
    const player1CurrentPosition = parseInt(player1.style.top);
    const dragon1CurrentPosition = parseInt(dragon1.style.top);

    // Adjust the position based on the key pressed and restrict it within the play area
    const moveAmount = 10;
    let player1NewPosition;
    let dragon1NewPosition;
    //The following part needs improvement. The max and min value o fthe new positions should be calculated by relative objects instead of a certain number. 
    switch(event.key) {
        case 'w':
        case 'W':
            event.preventDefault();
            player1NewPosition= Math.max(player1CurrentPosition - moveAmount, 0)
            dragon1NewPosition= Math.max(dragon1CurrentPosition - moveAmount, 30)
            break;
        case 's':
        case 'S':
            event.preventDefault();
            player1NewPosition= Math.min(player1CurrentPosition + moveAmount, 510);
            dragon1NewPosition= Math.min(dragon1CurrentPosition + moveAmount, 540);
            break; 
    }

    player1.style.top = player1NewPosition + 'px';
    dragon1.style.top = dragon1NewPosition + 'px';
    
    // Get player2 current position
    const player2CurrentPosition = parseInt(player2.style.top) || 0;
    const dragon2CurrentPosition = parseInt(dragon2.style.top) || 0;

    // Adjust the position based on the key pressed and restrict it within the play area
    let player2NewPosition;
    let dragon2NewPosition;
    //The following part needs improvement. The max and min value o fthe new positions should be calculated by relative objects instead of a certain number. 
    switch(event.key) {
        case 'ArrowUp':
            event.preventDefault();
            player2NewPosition= Math.max(player2CurrentPosition - moveAmount, 0)
            dragon2NewPosition= Math.max(dragon2CurrentPosition - moveAmount, 30)
            break;
        case 'ArrowDown':
            event.preventDefault();
            player2NewPosition= Math.min(player2CurrentPosition + moveAmount, 510);
            dragon2NewPosition= Math.min(dragon2CurrentPosition + moveAmount, 540);
            break; 
    }

    player2.style.top = player2NewPosition + 'px';
    dragon2.style.top = dragon2NewPosition + 'px';
}

document.addEventListener('keydown', playersControls);

//player1 release arrow function
function releaseArrow1(event){
    //Get player1 current top position
    const player1CurrentTop = parseInt(player1.style.top);
    const player1CurrentLeft = parseInt(player1.style.left);


    //Get player1 arrow current location
    const arrow1CurrentTop = player1CurrentTop + 12; 
    let arrow1CurrentLeft = player1CurrentLeft + 40;
    
    let arrow1;

    if(event.key ==='d' || event.key ==='D'){
        arrow1 = document.createElement('img');
        arrow1.src = '/assets/Images/Bow and Arrow Set/Png/Medium/Arrow5.png';
        arrow1.style.position ='absolute';
        arrow1.style.top = arrow1CurrentTop + 'px';
        arrow1.style.width = '60px';
        arrow1.style.height = '10px';

        function moveArrow(){
            if(arrow1CurrentLeft < 640){
                arrow1CurrentLeft += 20;
                arrow1.style.left = arrow1CurrentLeft + 'px';
                arrow1DectectsTargets(arrow1,arrow1CurrentLeft,arrow1CurrentTop); 
                setTimeout(moveArrow, getShootSpeed())
            }else{
                arrow1.style.display = 'none';
            }
        }

        moveArrow()       
    }

    if(arrow1){
        playArea.appendChild(arrow1);
        
        const arrow1Sound = document.createElement('audio');
        arrow1Sound.src = '/assets/Audio/Archers-shooting.flac';
        
        if(soundEffect === true){
            arrow1Sound.play();
        }else{
            arrow1Sound.pause();
        }
    }
}

document.addEventListener('keydown', releaseArrow1);

//arrow speed
function getShootSpeed(){
    return Math.floor(Math.random()*40);
}

//player2 release arrow function
function releaseArrow2 (event){
    //Get player1 current top position
    const player2CurrentTop = parseInt(player2.style.top);
    const player2CurrentLeft = parseInt(player2.style.left);


    //Get player2 arrow current location
    const arrow2CurrentTop = player2CurrentTop + 12; 
    let arrow2CurrentLeft = player2CurrentLeft - 40;
    
    let arrow2;

    if(event.key ==='ArrowLeft'){
        arrow2 = document.createElement('img');
        arrow2.src = '/assets/Images/ornamented_arrow.png';
        arrow2.style.position ='absolute';
        arrow2.style.top = arrow2CurrentTop + 'px';
        arrow2.style.width = '80px';
        arrow2.style.height = '15px';

        function moveArrow(){
            if(arrow2CurrentLeft > 160){
                arrow2CurrentLeft -= 20;
                arrow2.style.left = arrow2CurrentLeft + 'px';
                arrow2DectectsTargets(arrow2,arrow2CurrentLeft,arrow2CurrentTop); 
                setTimeout(moveArrow, getShootSpeed())
            }else{
                arrow2.style.display = 'none';
            }
        }

        moveArrow()       
    }

    if(arrow2){
        playArea.appendChild(arrow2);
        
        const arrow2Sound = document.createElement('audio');
        arrow2Sound.src = '/assets/Audio/shoot.ogg';

        if(soundEffect === true){
            arrow2Sound.play();
        }else{
            arrow2Sound.pause();
        }
    }
}
document.addEventListener('keydown', releaseArrow2);

//Game Start Button && Count down numbers
function startNewGame (){
    startButton.style.display='none';
    displayScore();
    player1.style.display = 'inline';
    player2.style.display = 'inline';
    dragon1.style.display = 'inline';
    dragon2.style.display = 'inline';
    gameTimer.style.display = 'inline';


    const startTimer = document.createElement('div');
    startTimer.id = 'start-timer';
    playArea.appendChild(startTimer);

    const countdownNumbers = ['3','2','1','GO!'];

    function updateCountdown(index){
        startTimer.textContent = countdownNumbers[index];
    }
    function startCountdown(index){
        if(index<=3){
            updateCountdown(index);
            setTimeout(function(){
                startCountdown(index+1);
            },1000);
        }else{
            startTimer.style.display = 'none';
            displayTimer();
            targetsArray.length = 0;
            appendTargets();
        }
    }
    startCountdown(0);
}

startButton.addEventListener('click',startNewGame)

// Generate targets points
function generateTargetsPoints () {
    targetsPoints = Math.floor(Math.random() * 1000);
}

//Append Targets 
function appendTargets (){
    let targets = document.createElement('img');
    targets.src = '/assets/Images/Targets/flames.gif';

    const player1Left = parseInt(player1.style.left);
    const player2Left = parseInt(player2.style.left);  
    const minLeft = player1Left + 40;
    const maxLeft = player2Left - 60;
    //max and min height needs to be improved. They should calculated based on playArea height, score boards height, player hight and dragon height.
    const targetsMinTop = 100;
    const targetsMaxTop = 520;
    const randomLeft = Math.floor(Math.random()*(maxLeft - minLeft + 1) + minLeft);
    const randomTop = Math.floor(Math.random() * (targetsMaxTop - targetsMinTop + 1) + targetsMinTop);

    generateTargetsPoints();
    
    targets.style.position = 'absolute';
    targets.style.width = '50px';
    targets.style.height = '50px';
    targets.style.left = randomLeft + 'px';
    targets.style.top = randomTop + 'px';

    const targetsLeft = parseInt(targets.style.left);
    const targetsTop = parseInt(targets.style.top);
    const targetsWidth = parseInt(targets.style.width);
    const targetsHeight = parseInt(targets.style.height);

    targetsPointsDisplay.style.position = 'absolute';
    targetsPointsDisplay.style.width = targetsWidth+ 'px';
    targetsPointsDisplay.style.height = targetsHeight + 'px';
    targetsPointsDisplay.style.left = targetsLeft + 'px';
    targetsPointsDisplay.style.top = targetsTop + targetsHeight + 'px';
    targetsPointsDisplay.textContent = targetsPoints;
    targetsPointsDisplay.style.fontSize = '2em';
    targetsPointsDisplay.style.color = 'green';
    targetsPointsDisplay.style.display = 'inline';

    playArea.appendChild(targets);
    targetsArray.push(targets);
    if(targets){
        const targetsAppendSound = document.createElement('audio');
    
        targetsAppendSound.src = '/assets/Audio/foom_0.wav';

        if(soundEffect === true){
            targetsAppendSound.play();
        }else{
            targetsAppendSound.pause();
        }
    }

    playArea.appendChild(targetsPointsDisplay);
}

//Arrow 1 detects targets
function arrow1DectectsTargets (arrow1,arrow1Left,arrow1Top){
    for (let i = 0; i < targetsArray.length; i++){
        const targets = targetsArray[i];
        const targetsLeft = parseInt(targets.style.left);
        const targetsTop = parseInt(targets.style.top);
        const targetsWidth = parseInt(targets.style.width);
        const targetsHeight = parseInt(targets.style.height);

        if (arrow1Left + 60 >= targetsLeft && arrow1Left <= targetsLeft + targetsWidth && arrow1Top >= targetsTop && arrow1Top <= targetsTop + targetsHeight){ 
            if(addPoints === true){ 
                player1Score = player1Score + targetsPoints;
            }
            targetsArray.splice(i,1);
            playArea.removeChild(targets);
            arrow1.style.display = 'none';
            targetsPointsDisplay.style.display = 'none';

            const hitTargetsSound = document.createElement('audio');
        
            hitTargetsSound.src = '/assets/Audio/cannon_fire.ogg';

            if(soundEffect === true){
                hitTargetsSound.play();
            }else{
                hitTargetsSound.pause();
            }

            if(newTarget === true){
                appendTargets();
            }
            
            displayScore();
    }
  }
}

//Arrow 2 detects targets
function arrow2DectectsTargets (arrow2,arrow2Left,arrow2Top){
    for (let i = 0; i < targetsArray.length; i++){
        const targets = targetsArray[i];
        const targetsLeft = parseInt(targets.style.left);
        const targetsTop = parseInt(targets.style.top);
        const targetsWidth = parseInt(targets.style.width);
        const targetsHeight = parseInt(targets.style.height);
        const targetsRight = targetsLeft + targetsWidth;

        if (arrow2Left <= targetsRight && arrow2Left >= targetsLeft && arrow2Top >= targetsTop && arrow2Top <= targetsTop + targetsHeight){  
            if(addPoints === true){ 
                player2Score = player2Score + targetsPoints;
            }
            targetsArray.splice(i,1);
            playArea.removeChild(targets);
            arrow2.style.display = 'none';
            targetsPointsDisplay.style.display = 'none';

            const hitTargetsSound = document.createElement('audio');
        
            hitTargetsSound.src = '/assets/Audio/cannon_fire.ogg';

            if(soundEffect === true){
                hitTargetsSound.play();
            }else{
                hitTargetsSound.pause();
            }

            if(newTarget === true){
                appendTargets();
            }

            displayScore();
    }
  }
}

//Display Players score
function displayScore () {
    const player1ScoreBoard = document.getElementById('score-board1')
    const player2ScoreBoard = document.getElementById('score-board2')

    player1ScoreBoard.textContent = player1Score;
    player1ScoreBoard.style.fontSize = '3em';
    player1ScoreBoard.style.textAlign = 'center';
    player1ScoreBoard.style.lineHeight = '100px';
    player1ScoreBoard.style.color = 'white';
    player1ScoreBoard.style.backgroundColor = 'black';
    player2ScoreBoard.textContent = player2Score;
    player2ScoreBoard.style.fontSize = '3em';
    player2ScoreBoard.style.textAlign = 'center';
    player2ScoreBoard.style.lineHeight = '100px';
    player2ScoreBoard.style.color = 'white';
    player2ScoreBoard.style.backgroundColor = 'black';
}

//Game timer function

function displayTimer (){
    if (newGame === true){
        let timeInSeconds = 60;

        function updateTimer() {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            gameTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
            // Decrease the time by 1 second
            timeInSeconds--;

            // Check if the timer has reached 0
            if (timeInSeconds < 0) {
                clearInterval(timerInterval); 
                gameTimer.textContent = 'Time up!';
                gameTimer.style.fontSize = '3em';
                gameEndFunction();
                clearAllTargets();
                displayGameResult();
            }
        }
    }

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);
}

//gameEnd function
function gameEndFunction () {
    document.removeEventListener('keydown', playersControls);
    document.removeEventListener('keydown',releaseArrow1);
    document.removeEventListener('keydown',releaseArrow2);
    newTarget = false;
    addPoints = false;
    newGame = false;
}

//Game result function
function displayGameResult(){
    const gameResultDiv = document.createElement('div');
    gameResultDiv.style.position = 'absolute';
    gameResultDiv.style.width = '300px';
    gameResultDiv.style.height = '100px';
    gameResultDiv.style.left = '300px';
    gameResultDiv.style.top = '150px';
    gameResultDiv.style.fontSize = '3em';
    gameResultDiv.style.color = 'purple';
    gameResultDiv.style.textAlign = 'center';

    if(player1Score > player2Score){
        gameResultDiv.textContent = 'Elf knight won!'
    }else if (player1Score < player2Score){
        gameResultDiv.textContent = 'Golden Knight won!'
    }else{
        gameResultDiv.textContent = "It's a tie!"
        gameResultDiv.style.fontSize = '5em';
    }

    const playAgainButt = document.createElement('button');
    const gameResultDivLeft = parseInt(gameResultDiv.style.left);
    const gameResultDivTop = parseInt(gameResultDiv.style.top);
    const gameResultDivHeight = parseInt(gameResultDiv.style.height);

    playAgainButt.style.position = 'absolute';
    playAgainButt.style.width = '150px';
    playAgainButt.style.height = '100px';
    playAgainButt.textContent = 'Play Again';
    playAgainButt.style.fontSize = '2em';
    playAgainButt.style.left = gameResultDivLeft + 75 + 'px';
    playAgainButt.style.top = gameResultDivTop + gameResultDivHeight + 10 + 'px';

    playArea.appendChild(gameResultDiv)
    playArea.appendChild(playAgainButt)

    playAgainButt.addEventListener('click', function (){
        playAgainButt.style.display = 'none';
        gameResultDiv.style.display = 'none';
        document.addEventListener('keydown', playersControls);
        document.addEventListener('keydown',releaseArrow1);
        document.addEventListener('keydown',releaseArrow2);

        gameTimer.textContent = '1:00';
        player1Score = 0;
        player2Score = 0;

        newTarget = true;
        addPoints = true;
        newGame = true;

        startNewGame();
    });
}

// Clear all targets function
function clearAllTargets() {
    for (const target of targetsArray) {
        playArea.removeChild(target);
    }
    targetsArray.length = 0;
    targetsPointsDisplay.style.display = 'none';
}


//Background music control functions
function controlBackgroundMusic (){
    const bgMusicButton = document.getElementById('bgMusicButton');

    bgMusicButton.addEventListener('click', function(){
        if(bgMusic.paused){
            bgMusic.play();
            bgMusicButton.textContent = 'Music: ON';
        }else{
            bgMusic.pause();
            bgMusicButton.textContent = 'Music: OFF';
        }
    });
}

controlBackgroundMusic();

//Sound effects control
function controlSoundEffect (){
    const soundEffectButton = document.getElementById('sound-effect-button');

    soundEffectButton.addEventListener('click',function(){
        if(soundEffect === false){
            soundEffect = true;
            soundEffectButton.textContent = 'Effect: ON';
        }else{
            soundEffect = false;
            soundEffectButton.textContent = 'Effect: OFF';
        }
    });
}

controlSoundEffect();