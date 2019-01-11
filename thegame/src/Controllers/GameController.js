let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1068;
document.body.appendChild(canvas);



let globalObj = {player: null, enemy: null, playername: null, gameCanvas: canvas, gameContext: context, enemiesCount: 0};


export default globalObj;







