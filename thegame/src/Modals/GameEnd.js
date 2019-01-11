function gameEnd(message){
    let endModal = document.querySelector('.game-end-modal');
    endModal.style.display = 'flex';
    let endHeader = document.createElement('h1');
    let endText = document.createTextNode(message);
    endHeader.appendChild(endText);
    endModal.appendChild(endHeader);
}
export default gameEnd;

