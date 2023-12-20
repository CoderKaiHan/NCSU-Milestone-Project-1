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

function createItem (src,position,width,height,top,left,zIndex){
    const item = document.createElement('img');
    item.src = src;
    item.style.position = position;
    item.style.width =width;
    item.style.height = height;
    item.style.top = top;
    item.style.left = left;
    item.style.zIndex = zIndex;
    playArea.appendChild(item);
    return item;
}

function moveItem (item,right,down,scaleX,rotate){
    item.style.transform = `translate(${right}px, ${down}px) scaleX(${scaleX}) rotate(${rotate}deg)`
}

const character1 = createCharacter('/assets/Images/archer light.png',1,'absolute','85%','10%','-1')

const character2 = createCharacter('/assets/Images/archer_elf.png',-1,'absolute','85%','80%','-1')

const bow1 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png','absolute','20px','40px','85%','10%','1')

const bow2 = createItem('/assets/Images/Bow and Arrow Set/Png/Small/Bow3.png','absolute','20px','40px','85%','80%','1')

const arrow1 = createItem('/assets/Images/arrow (1).png','absolute','8px','50px','85%','10%')

const arrow2 = createItem('/assets/Images/arrow (1).png','absolute','8px','50px','85%','80%')

moveItem(bow1,45,2,1,0)
moveItem(bow2,0,0,-1,0)
moveItem(arrow1,45,-3,1,90)
moveItem(arrow2,10,-4,-1,90)


const canvas = document.getElementById('myCanvas');
const ctx =canvas.getContext('2d');

let playAni = false;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

animate();

canvas.addEventListener("click",()=>{
    playAni = true;
});