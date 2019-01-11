require("babel-polyfill");



import initChooseNameModal from './Modals/SelectNameModal';
import initChooseSpellModal from './Modals/SelectSpellModal';
import initChooseTaskModal from './Modals/SelectTaskModal';
import Character from './Characters/player';
import Enemy from './Characters/enemy';
import globalObj from './Controllers/GameController';

let totalResources = 28;
let numResourcesLoaded = 0;


function loadImage(name) {

    images[name] = new Image();
    images[name].onload = function() { 
        resourceLoaded();
    }
    images[name].src = "images/" + name + ".png";
}
function resourceLoaded(){
    numResourcesLoaded += 1;
    if(numResourcesLoaded === totalResources) {
      globalObj.gameImages = images;
      //globalObj.redraw();
    }
  }
let images = {};
function loadImages(){
    loadImage("bg");
    loadImage("hero");
    loadImage("hero-attacked");
    loadImage("hero-healed");
    loadImage("player-fireball");
    loadImage("monster-fireball");
    loadImage("enemy-head-1-attacked");
    loadImage("enemy-head-2-attacked");
    loadImage("enemy-head-3-attacked");
    loadImage("enemy-body-1");
    loadImage("enemy-head-1");
    loadImage("leg-left-1");
    loadImage("leg-right-1");
    loadImage("arm-left-1");
    loadImage("arm-right-1");
    loadImage("enemy-body-2");
    loadImage("enemy-head-2");
    loadImage("leg-left-2");
    loadImage("leg-right-2");
    loadImage("arm-left-2");
    loadImage("arm-right-2");
    loadImage("enemy-body-3");
    loadImage("enemy-head-3");
    loadImage("leg-left-3");
    loadImage("leg-right-3");
    loadImage("arm-left-3");
    loadImage("arm-right-3");
    loadImage("sword");
}

loadImages();
let player = new Character();
let opponent = new Enemy();
globalObj.player = player;
globalObj.enemy = opponent;
globalObj.redraw = function(){
    globalObj.gameCanvas.width = globalObj.gameCanvas.width; // clears the canvas     
    globalObj.gameContext.drawImage(globalObj.gameImages["bg"], 0, 0);
    
    globalObj.player.createFigure();
    globalObj.player.createHealthBar();
    
    globalObj.enemy.createFigure();
    globalObj.enemy.createHealthBar();

    if(document.querySelector('.attack-button')){
      document.querySelector('.attack-button').focus();
    }
}
function getAnswer(result, type){
  if(type === 'heal'){
    if(result){
      globalObj.player.heal();
      return;
    }
  }
  if(result){
    globalObj.player.correctAnswer();
  }
  else globalObj.player.wrongAnswer();
}

initChooseNameModal();
initChooseSpellModal();
initChooseTaskModal();



let attackButton = document.createElement('button');
attackButton.classList.add('attack-button');
attackButton.innerHTML = 'Attack';
attackButton.addEventListener('click', ()=>{
  let modal = document.querySelector('.modal');
  modal.style.display = "block";
  chooseCast();
});
document.body.appendChild(attackButton);
function chooseCast(){
  let attackType = document.querySelector('.attack-type');
  attackType.style.display = "flex";
  attackType.firstChild.focus();  
}

export default getAnswer;









