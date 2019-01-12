require("babel-polyfill");
import globalObj from '../Controllers/GameController';
import Enemy from './enemy';
import gameEnd from '../Modals/GameEnd';
class Character {
  constructor() {
      this.health = 100;
      this.spellX = 345;
      this.x = 345;
      this.y = 550;
  }
  createFigure () {
      globalObj.gameContext.drawImage(globalObj.gameImages["hero"], this.x, this.y, 350, 350);
  }
  async attack(){
    if (this.spellX >= globalObj.enemy.x) {
      globalObj.redraw();
      this.spellX = 345;
      globalObj.enemy.health-=100;

      if(this.checkWin()){
        globalObj.enemy.dead = true;
        globalObj.enemiesCount ++;
      }
      await globalObj.enemy.takeAttack();
      //globalObj.redraw();
      return;
    }
    globalObj.redraw();
    globalObj.gameContext.drawImage(globalObj.gameImages["player-fireball"], this.spellX, 600, 200, 150);
    this.spellX +=15;
    requestAnimationFrame(() => { this.attack() });
  }
  async heal(){
    this.health +=50;
    if(this.health >= 100){
      this.health = 100;
    }
    this.playSound();
    await this.healAnimation();
    globalObj.redraw();
  }
  healAnimation(){
    return new Promise(resolve => {
      globalObj.gameContext.drawImage(globalObj.gameImages["hero-healed"], this.x, this.y, 350, 350);
    setTimeout(() => {
      resolve();
    }, 3000);
    }); 
  }
  playSound(){
    return new Promise(resolve => {
      const audio = new Audio('audio/player.wav');
    audio.play();
    setTimeout(() => {
      resolve();
    }, 3000);
    }); 
  }
  takeAttack(){
    return new Promise(resolve => {
      globalObj.gameContext.drawImage(globalObj.gameImages["hero-attacked"], this.x, this.y, 350, 350);
    setTimeout(() => {
      resolve();
    }, 1000);
    }); 
  }
  createHealthBar(){
    globalObj.gameContext.fillStyle = "black";
    globalObj.gameContext.font = "30px Arial";
    globalObj.gameContext.fillText(this.name, this.x, 60);

    globalObj.gameContext.rect(this.x, 70, 300, 20);
    globalObj.gameContext.stroke();
    globalObj.gameContext.fillStyle = "#90EE90";
    globalObj.gameContext.fillRect(this.x, 70, this.health*3, 20);
  }
    async correctAnswer(){
    await pause(1000);
    globalObj.player.attack();
    await globalObj.player.playSound();
    if(globalObj.enemy.dead){
      if(globalObj.enemiesCount === 3){
        gameEnd('Win!');
        return;
      }
      globalObj.enemy = new Enemy();
      globalObj.redraw();
      return;
    }
    globalObj.enemy.attack();
    globalObj.enemy.playSound();
  }
  
  async wrongAnswer(){
    await pause(1000);
    globalObj.enemy.attack();
    globalObj.enemy.playSound();
  }
  checkWin(){
    if(globalObj.enemy.health <= 0){
      return true;
    }
    return false;
  }
}
const pause = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export default Character;