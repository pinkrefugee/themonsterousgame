import globalObj from '../Controllers/GameController';
function initChooseNameModal(){
    let nameModal = document.querySelector('.choose-name-modal');
    let nameInput = document.createElement('input');
    nameInput.classList.add('name-input');
    nameInput.placeholder = 'Choose character name...'
    let nameButton = document.createElement('button');
    nameButton.innerHTML = 'Play';
    nameButton.addEventListener('click', ()=>{
      if(nameInput.value){
        globalObj.player.name = nameInput.value;
        nameModal.style.display = 'none';
        globalObj.redraw();
      }
    })
    nameModal.appendChild(nameInput);
    nameModal.appendChild(nameButton);
    nameModal.addEventListener('keydown', (event)=>{
      
      if (event.key === 'ArrowRight'){
        document.activeElement.nextSibling.focus();
      } 
      if (event.key === 'ArrowLeft'){
        document.activeElement.previousSibling.focus();
      } 
    })
    nameInput.focus();

  }
export default initChooseNameModal;