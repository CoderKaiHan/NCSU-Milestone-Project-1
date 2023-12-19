const playArea = document.querySelector('#play-area')

function createCharacter (src,scaleX,position,top,left,zIndex){
    const character = document.createElement('img');
    character.src = src;
    character.style.transform = `scaleX(${scaleX})`
    character.style.position = position;
    character.style.top = top;
    character.style.left = left;
    character.style.zIndex = zIndex;
    playArea.appendChild(character);
    return character
}


function createItem (src,scaleX,position,width,height,zIndex,top,left){
    const item = document.createElement('img');
    item.src = src;
    item.style.transform = `scaleX(${scaleX})`;
    item.style.position = position;
    item.style.width =width;
    item.style.height = height;
    item.style.zIndex = zIndex;
    item.style.top = top;
    item.style.left = left;
    playArea.appendChild(item);
    return item;
}

// function attachItemToCharacter(character,attachedItem,xPercentage,yPercentage) {
//     const characterRect = character.getBoundingClientRect();
//     const xOffset = (parseFloat(xPercentage)) * characterRect.width;
//     const yOffset = (parseFloat(yPercentage)) * characterRect.height;
//     const newX =characterRect.left + characterRect.width + xOffset;
//     const newY = characterRect.top + characterRect.height + yOffset;

//     attachedItem.style.position = 'absolute';
//     attachedItem.style.left = newX +'px'
//     attachedItem.style.top = newY + 'px'
// }

// function attachItemToCharacter(attachedItem,character,left,top) {
//     const characterRect = character.getBoundingClientRect();
//     const leftOffset = (left / 100) * characterRect.width;
//     const topOffset = (top / 100) * characterRect.height;

//     attachedItem.style.position = 'absolute';
//     attachedItem.style.left = characterRect.left + leftOffset + 'px';
//     attachedItem.style.top = characterRect.top + topOffset + 'px';
// }

const character1 = createCharacter('/assets/Images/archer light.png',1,'absolute','85%','10%','-1')

const character2 = createCharacter('/assets/Images/archer_elf.png',-1,'absolute','85%','80%','-1')

const bow1 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png',1,'absolute','20px','40px','1','86%','14%')

const bow2 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png',-1,'absolute','20px','40px','1','86%','81%')

// attachItemToCharacter(bow1, character1,600,145)