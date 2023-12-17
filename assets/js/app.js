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
    return character;

}

function createItem (src,scaleX,width,height,position,zIndex){
    const item = document.createElement('img');
    item.src = src;
    item.style.transform = `scaleX(${scaleX})`;
    item.style.width =width;
    item.style.height = height;
    item.style.position = position;
    item.style.zIndex = zIndex;
    playArea.appendChild(item);
    return item;
}

function attachItemToCharacter(character,attachedItem,x,y) {
    const characterRect = character.getBoundingClientRect();
    const newX = characterRect.left + characterRect.width + x;
    const newY = characterRect.top +characterRect.height + y;
    attachedItem.style.position = 'absolute';
    attachedItem.style.left = newX +'px'
    attachedItem.style.top = newY + 'px'
}

const character1 = createCharacter('/assets/Images/archer light.png',1,'absolute','85%','10%','-1')

const character2 = createCharacter('/assets/Images/archer_elf.png',-1,'absolute','85%','80%','-1')

const bow1 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png',1,'20px','40px','absolute','1')

const bow2 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png',-1,'20px','40px','absolute','1')

attachItemToCharacter(character1,bow1,'-10%','-20%')