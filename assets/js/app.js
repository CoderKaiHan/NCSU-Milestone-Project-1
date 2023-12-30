//define a playArea variable
const playArea = document.querySelector('#play-area');

const player1 = document.getElementById('player1');

player1.style.top = '240px';
player1.style.left = '100px';

//player1 control function
document.addEventListener('keydown', function(event) {
    // Get player1 current position
    const player1CurrentPosition = parseInt(player1.style.top) || 0;
    
    // Adjust the position based on the key pressed and restrict it within the play area
    const moveAmount = 10;
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
    player1.style.top = player1NewPosition + 'px'
});

//player1 release arrow function
document.addEventListener('keydown',function(event){
    //Get player1 current top position
    const player1CurrentTop = parseInt(player1.style.top);
    const player1CurrentLeft = parseInt(player1.style.left);
    //check player1 location
    console.log('player1CurrentTop:', player1CurrentTop);
    console.log('player1CurrentLeft:', player1CurrentLeft);


    //Get player1 arrow current location
    const arrow1CurrentTop = player1CurrentTop + 12; 
    let arrow1CurrentLeft = player1CurrentLeft + 40;
    
    let arrow1;

    if(event.key ==='b'){
        arrow1 = document.createElement('img');
        arrow1.src = '/assets/Images/Bow and Arrow Set/Png/Medium/Arrow5.png';
        arrow1.style.position ='absolute';
        arrow1.style.top = arrow1CurrentTop + 'px';
        // arrow1.style.left = arrow1CurrentLeft + 'px';
        arrow1.style.width = '60px';
        arrow1.style.height = '10px';
        //check arrow location
        console.log('arrow1CurrentTop:', arrow1CurrentTop);
        console.log('arrow1CurrentLeft:', arrow1CurrentLeft);

        function moveArrow(){
            if(arrow1CurrentLeft < 800){
                arrow1CurrentLeft +=50;
                arrow1.style.left = arrow1CurrentLeft + 'px';
                setTimeout(moveArrow, getShootSpeed)
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
    return Math.floor(Math.random());
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