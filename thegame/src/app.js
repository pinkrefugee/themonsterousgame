require("babel-polyfill");

import words from './Tasks/translation/dictionary';
import listeningComprehensionWords from './Tasks/ListeningComprehension/ListeningComprehensionWords';
import setMonsterName from './Characters/MonsterName';

let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1068;
document.body.appendChild(canvas);
let totalResources = 23;
let numResourcesLoaded = 0;
let globalObj = {player: null, enemy: null};


let images = {};

class Character {
  constructor() {
      this.health = 100;
      this.spellX = 345;
      this.x = 345;
      this.y = 550;
  }
  createFigure (x, y) {
      context.drawImage(images["hero"], this.x, this.y, 350, 350);
  }
  attack(){
    if (this.spellX >= globalObj.enemy.x) {
      redraw();
      this.spellX = 345;
      globalObj.enemy.health-=50;
      if(player.checkWin()){
        globalObj.enemy.dead = true;
      }
      return;
    }
    redraw();
    context.drawImage(images["player-fireball"], this.spellX, 600, 200, 150);
    this.spellX +=15;
    requestAnimationFrame(() => { this.attack() });
  }
  playSound(){
    const audio = new Audio('audio/player.wav');
    audio.play();
  }
  createHealthBar(){
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(this.name, this.x, 30);

    context.rect(this.x, 40, 300, 20);
    context.stroke();
    context.fillStyle = "green";
    context.fillRect(this.x, 40, this.health*3, 20);
  }
  checkWin(){
    if(globalObj.enemy.health <= 0){
      return true;
    }
    return false;
  }
}

class Enemy {
  constructor() {
      this.name = setMonsterName();
      this.health = 100;
      this.x = 1345;
      this.y = 820;
      this.spellX = 1345;
      this.legType = Math.floor(Math.random() * 3) + 1;
      this.bodyType = Math.floor(Math.random() * 3) + 1;
      this.headType = Math.floor(Math.random() * 3) + 1;
      this.dead = false;
  }
  createFigure() {
    context.drawImage(images[`leg-left-${this.legType}`], this.x, this.y, 70, 70);
    context.drawImage(images[`leg-right-${this.legType}`], this.x + 70, this.y, 70, 70);
    context.drawImage(images[`arm-left-${this.legType}`], this.x - 20, this.y - 70, 70, 70);
    context.drawImage(images['sword'], this.x - 200, this.y - 190, 250, 200);
    context.drawImage(images[`enemy-body-${this.bodyType}`], this.x, this.y - 120, 150, 150);
    context.drawImage(images[`enemy-head-${this.headType}`], this.x, this.y - 220, 150, 150);
    context.drawImage(images[`arm-right-${this.legType}`], this.x + 50, this.y - 70, 70, 70);
    
  }
  attack(){
    if (this.spellX <= player.x) {
      this.spellX = 1345;
      player.health -= 20;
      redraw();
      return;
    }
    redraw();
    context.drawImage(images["monster-fireball"], this.spellX, 600, 200, 150);
    this.spellX -=15;
    requestAnimationFrame(() => { this.attack() });
  }
  playSound(){
    const audio = new Audio('audio/monster.wav');
    audio.play();
  }
  createHealthBar(){
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(this.name, this.x, 30);

    context.rect(this.x, 40, 300, 20);
    context.stroke();
    context.fillStyle = "green";
    context.fillRect(this.x, 40, this.health*3, 20);
  }
}

let player = new Character();
let opponent = new Enemy();
globalObj.enemy = opponent;

initChooseNameModal();
initChooseCastModal();
initChooseTaskModal();

loadImage("bg");
loadImage("hero");
loadImage("player-fireball");
loadImage("monster-fireball");
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
    redraw();
  }
}

  
function redraw() {
 

  
  canvas.width = canvas.width; // clears the canvas     
  context.drawImage(images["bg"], 0, 0);
  
  player.createFigure();
  player.createHealthBar();
   
  globalObj.enemy.createFigure();
  globalObj.enemy.createHealthBar();
   
}
const pause = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

async function correctAnswer(){
  await pause(1000);
  let att = await player.attack();
  player.playSound();
  await pause(2000);
  if(globalObj.enemy.dead){
    globalObj.enemy = new Enemy();
    redraw();
    return;
  }
  
  globalObj.enemy.attack();
  globalObj.enemy.playSound();
}

async function wrongAnswer(){
  await pause(1000);
  globalObj.enemy.attack();
  globalObj.enemy.playSound();
}

let but = document.createElement('button');
but.classList.add('abs');
but.style.width = '100px';
but.style.height = '20px';

but.addEventListener('click', ()=>{
  let modal = document.querySelector('.modal');
  modal.style.display = "block";
  chooseCast();
});
document.body.appendChild(but);
function chooseCast(){
  let attackType = document.querySelector('.attack-type');
  attackType.style.display = "flex";
  
}
function chooseTask(){
  let taskType = document.querySelector('.task-type');
  taskType.style.display = "flex";
}
function initChooseNameModal(){
  let nameModal = document.querySelector('.choose-name-modal');
  let nameInput = document.createElement('input');
  let nameButton = document.createElement('button');
  nameButton.innerHTML = 'Play';
  nameButton.addEventListener('click', ()=>{
    player.name = nameInput.value;
    nameModal.style.display = 'none';
    redraw();
  })
  nameModal.appendChild(nameInput);
  nameModal.appendChild(nameButton);
}
function initChooseCastModal(){
  let attackType = document.querySelector('.attack-type');
  let attackButton = document.createElement('button');
  attackButton.addEventListener('click', function(){
    attackType.style.display = "none";
    chooseTask();
  })
  attackButton.innerHTML = 'Attack'
  let healButton = document.createElement('button');
  healButton.innerHTML = 'Heal';
  
  attackType.appendChild(attackButton);
  attackType.appendChild(healButton);
}
function initChooseTaskModal(){
  let taskType = document.querySelector('.task-type');
  let arithmeticButton = document.createElement('button');
  arithmeticButton.innerHTML = 'Arithmetic';
  taskType.appendChild(arithmeticButton);
  arithmeticButton.addEventListener('click', function(){
    taskType.style.display = "none";
    arithmeticTask();
  })
  let translateButton = document.createElement('button');
  translateButton.innerHTML = 'Translation';
  taskType.appendChild(translateButton);
  translateButton.addEventListener('click', function(){
    taskType.style.display = "none";
    translateTask();
  })
  let listenButton = document.createElement('button');
  listenButton.innerHTML = 'Listening Comprehension';
  taskType.appendChild(listenButton);
  listenButton.addEventListener('click', function(){
    taskType.style.display = "none";
    listeningComprehensionTask();
  })
}

function arithmeticTask(){
  let arithmeticContainer = document.querySelector('.arithmetic-task');
  arithmeticContainer.style.display = "flex";
  let expression = document.createElement('div');

  const operations = ['+', '-', '*'];
  let firstNumber = Math.floor(Math.random() * 100);
  let secondNumber = Math.floor(Math.random() * 100);
  let operationIndex = Math.floor(Math.random() * 3);
  let a = '' + firstNumber + operations[operationIndex] + secondNumber;
  expression.innerText = a + ' =';
  
  
  let input = document.createElement('input');
  input.setAttribute("type", "text");
  

  let arithmeticAnswerButton = document.createElement('button');
  arithmeticAnswerButton.innerHTML = 'Answer';
  arithmeticAnswerButton.addEventListener('click', function(){
    arithmeticContainer.style.display = "none";
    while (arithmeticContainer.firstChild) {
      arithmeticContainer.removeChild(arithmeticContainer.firstChild);
    }
    let modal = document.querySelector('.modal');
    modal.style.display = "none";
    if(input.value == eval(a)){
      correctAnswer();
    }
    else{
      wrongAnswer();
    };
  })


  arithmeticContainer.appendChild(expression);
  arithmeticContainer.appendChild(input);
  arithmeticContainer.appendChild(arithmeticAnswerButton);

}

function translateTask(){
  let translateTaskContainer = document.querySelector('.translate-task');
  translateTaskContainer.style.display = "flex";
  let givenWord = document.createElement('div');
  let wordIndex = Math.floor(Math.random() * words.length);
  givenWord.innerHTML = words[wordIndex].word;
  translateTaskContainer.appendChild(givenWord);
  let input = document.createElement('input');
  input.setAttribute("type", "text");
  translateTaskContainer.appendChild(input);

  let translateAnswerButton = document.createElement('button');
  translateAnswerButton.innerHTML = 'Answer';
  translateAnswerButton.addEventListener('click', function(){
    translateTaskContainer.style.display = "none";
    while (translateTaskContainer.firstChild) {
      translateTaskContainer.removeChild(translateTaskContainer.firstChild);
    }
    let modal = document.querySelector('.modal');
    modal.style.display = "none";
    if(words[wordIndex].translation.includes(input.value)){
      correctAnswer();
    }
    else {
      wrongAnswer();
    }    

  });
  translateTaskContainer.appendChild(translateAnswerButton);
}

function listeningComprehensionTask(){
  let listeningTaskContainer = document.querySelector('.listen-task');
  listeningTaskContainer.style.display = "flex";

  let input = document.createElement('input');
  input.setAttribute("type", "text");
  listeningTaskContainer.appendChild(input);

  let pronounceWordButton = document.createElement('button');
  pronounceWordButton.innerHTML = 'Listen';
  let wordIndex = Math.floor(Math.random() * listeningComprehensionWords.length);
  pronounceWordButton.addEventListener('click', function(){
    let synth = window.speechSynthesis;
    let speech = new SpeechSynthesisUtterance(listeningComprehensionWords[wordIndex]);
    speech.lang = 'en-GB';
    synth.speak(speech);
  })
  listeningTaskContainer.appendChild(pronounceWordButton);

  let listeningAnswerButton = document.createElement('button');
  listeningAnswerButton.innerHTML = 'Answer';

  listeningAnswerButton.addEventListener('click', function(){
    listeningTaskContainer.style.display = "none";
    while (listeningTaskContainer.firstChild) {
      listeningTaskContainer.removeChild(listeningTaskContainer.firstChild);
    }
    let modal = document.querySelector('.modal');
    modal.style.display = "none";
    if(input.value === listeningComprehensionWords[wordIndex]){
      correctAnswer();
    }
    else {
      wrongAnswer();
    }    

  });
  listeningTaskContainer.appendChild(listeningAnswerButton); 

}


