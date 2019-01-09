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
  export default Character;