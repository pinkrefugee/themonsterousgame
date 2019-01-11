import globalObj from "../Controllers/GameController";

function gameEnd(message){
    
    let endModal = document.querySelector('.game-end-modal');
    endModal.style.display = 'flex';
    let endHeader = document.createElement('h1');
    let endText = document.createTextNode(message);
    let endButton = document.createElement('button');
    endButton.classList.add('end-button');
    endButton.innerHTML = 'Start New';
    endButton.addEventListener('click', function(){
        location.reload();
    })
    endHeader.appendChild(endText);
    endModal.appendChild(endHeader);
    endModal.appendChild(endButton);
    endButton.focus();
}
export default gameEnd;

