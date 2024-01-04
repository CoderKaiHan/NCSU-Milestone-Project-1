//define a playArea variable
const playArea = document.querySelector('#play-area');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2')

player1.style.top = '240px';
player1.style.left = '100px';
player2.style.top = '240px';
player2.style.left = '740px';


//players control function
document.addEventListener('keydown', function(event) {
    // Get player1 current position
    const player1CurrentPosition = parseInt(player1.style.top) || 0;
    
    // Adjust the position based on the key pressed and restrict it within the play area
    const moveAmount = 20;
    let player1NewPosition;
    switch(event.key) {
        case 'w':
            event.preventDefault();
            player1NewPosition= Math.max(player1CurrentPosition - moveAmount, 0)
            break;
        case 's':
            event.preventDefault();
            player1NewPosition= Math.min(player1CurrentPosition + moveAmount, 540);
            break; 
    }
    player1.style.top = player1NewPosition + 'px';
    
    // Get player2 current position
    const player2CurrentPosition = parseInt(player2.style.top) || 0;

    // Adjust the position based on the key pressed and restrict it within the play area
    let player2NewPosition;
    switch(event.key) {
        case 'ArrowUp':
            event.preventDefault();
            player2NewPosition= Math.max(player2CurrentPosition - moveAmount, 0)
            break;
        case 'ArrowDown':
            event.preventDefault();
            player2NewPosition= Math.min(player2CurrentPosition + moveAmount, 540);
            break; 
    }
    player2.style.top = player2NewPosition + 'px';
});

//player1 release arrow function
document.addEventListener('keydown',function(event){
    //Get player1 current top position
    const player1CurrentTop = parseInt(player1.style.top);
    const player1CurrentLeft = parseInt(player1.style.left);


    //Get player1 arrow current location
    const arrow1CurrentTop = player1CurrentTop + 12; 
    let arrow1CurrentLeft = player1CurrentLeft + 40;
    
    let arrow1;

    if(event.key ==='d'){
        arrow1 = document.createElement('img');
        arrow1.src = '/assets/Images/Bow and Arrow Set/Png/Medium/Arrow5.png';
        arrow1.style.position ='absolute';
        arrow1.style.top = arrow1CurrentTop + 'px';
        arrow1.style.width = '60px';
        arrow1.style.height = '10px';

        function moveArrow(){
            if(arrow1CurrentLeft < 640){
                arrow1CurrentLeft +=30;
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
    }
});

//arrow speed
function getShootSpeed(){
    return Math.floor(Math.random()*40);
}

//player2 release arrow function
document.addEventListener('keydown',function(event){
    //Get player1 current top position
    const player2CurrentTop = parseInt(player2.style.top);
    const player2CurrentLeft = parseInt(player2.style.left);


    //Get player1 arrow current location
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
                arrow2CurrentLeft -=30;
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
    }
});

//Game Start Button && Count down numbers
const startButton = document.getElementById('start-button')

startButton.addEventListener('click',function(){
    startButton.style.display='none';

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
            appendTargets();
        }
    }
    startCountdown(0);

})


//Append Targets 
const targetsArray = [];

function appendTargets (){
    let targets = document.createElement('img');
    targets.src = '/assets/Images/Targets/xbullet.png';

    const maxLeft = 700;
    const minLeft = 200;
    const randomLeft = Math.floor(Math.random()*(maxLeft - minLeft + 1) + minLeft);
    
    targets.style.position = 'absolute';
    targets.style.width = '30px';
    targets.style.height = '30px';
    targets.style.left = randomLeft + 'px';
    targets.style.top = Math.floor(Math.random() * (playArea.clientHeight - targets.height)) + 'px';

    playArea.appendChild(targets)

    targetsArray.push(targets);

    return targets;
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
            targetsArray.splice(i,1);
            playArea.removeChild(targets);
            arrow1.style.display = 'none';
            appendTargets();
;    }
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
            targetsArray.splice(i,1);
            playArea.removeChild(targets);
            arrow2.style.display = 'none';
            appendTargets();
;    }
  }
}
























// //set playArea background image
// playArea.style.background ="url(/assets/Images/bg001.png) no-repeat";
// playArea.style.backgroundSize = "100% 100%";

// //create character function
// function createCharacter (src,scaleX,position,top,left,zIndex){
//     const character = document.createElement('img');
//     character.src = src;
//     character.style.transform = `scaleX(${scaleX})`
//     character.style.position = position;
//     character.style.top = top;
//     character.style.left = left;
//     character.style.zIndex = zIndex;
//     playArea.appendChild(character);
//     return character
// }
// //create item function
// function createItem (src,position,width,height,top,left,zIndex){
//     const item = document.createElement('img');
//     item.src = src;
//     item.style.position = position;
//     item.style.width =width;
//     item.style.height = height;
//     item.style.top = top;
//     item.style.left = left;
//     item.style.zIndex = zIndex;
//     playArea.appendChild(item);
//     return item;
// }

// //move item function
// function moveItem (item,right,down,scaleX,rotate){
//     item.style.transform = `translate(${right}px, ${down}px) scaleX(${scaleX}) rotate(${rotate}deg)`
// }

// //Arrow shooting function
// function shootArrow (arrow){
//     const arrowMoving =[
//         {transform:''}
//     ]
// }


// //create characters and items
// const character1 = createCharacter('/assets/Images/archer light.png',1,'absolute','85%','10%','1')

// const character2 = createCharacter('/assets/Images/archer_elf.png',-1,'absolute','85%','80%','1')

// const bow1 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png','absolute','20px','40px','85%','10%','1')

// const bow2 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png','absolute','20px','40px','85%','80%','1')

// const arrow1 = createItem('/assets/Images/arrow (1).png','absolute','8px','50px','85%','10%')

// const arrow2 = createItem('/assets/Images/arrow (1).png','absolute','8px','50px','85%','80%')

// //move items to the initial position
// moveItem(bow1,45,2,1,0)
// moveItem(bow2,0,0,-1,0)
// moveItem(arrow1,45,-3,1,90)
// moveItem(arrow2,10,-4,-1,90)

// // shootArrow(arrow1)