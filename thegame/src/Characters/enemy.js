import setMonsterName from './MonsterName';
import globalObj from '../Controllers/GameController';
import gameEnd from '../Modals/GameEnd';
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
      globalObj.gameContext.drawImage(globalObj.gameImages[`leg-left-${this.legType}`], this.x, this.y, 70, 70);
      globalObj.gameContext.drawImage(globalObj.gameImages[`leg-right-${this.legType}`], this.x + 70, this.y, 70, 70);
      globalObj.gameContext.drawImage(globalObj.gameImages[`arm-left-${this.legType}`], this.x - 20, this.y - 70, 70, 70);
      globalObj.gameContext.drawImage(globalObj.gameImages['sword'], this.x - 200, this.y - 190, 250, 200);
      globalObj.gameContext.drawImage(globalObj.gameImages[`enemy-body-${this.bodyType}`], this.x, this.y - 120, 150, 150);
      globalObj.gameContext.drawImage(globalObj.gameImages[`enemy-head-${this.headType}`], this.x, this.y - 220, 150, 150);
      globalObj.gameContext.drawImage(globalObj.gameImages[`arm-right-${this.legType}`], this.x + 50, this.y - 70, 70, 70);
      
    }
    attack(){
      if (this.spellX <= globalObj.player.x) {
        this.spellX = 1345;
        globalObj.player.health -= 20;
        if(this.checkDead()){
           gameEnd('Loose!');
           return;
        }
        globalObj.redraw();
        return;
      }
      globalObj.redraw();
      globalObj.gameContext.drawImage(globalObj.gameImages["monster-fireball"], this.spellX, 600, 200, 150);
      this.spellX -=15;
      requestAnimationFrame(() => { this.attack() });
    }
    playSound(){
      const audio = new Audio('audio/monster.wav');
      audio.play();
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
    checkDead(){
      if(globalObj.player.health <= 0){
        return true;
      }
      return false;
    }
  }
  
  export default Enemy;