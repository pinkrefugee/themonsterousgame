import setMonsterName from './MonsterName';
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

  export default Enemy;