import animalsTask from '../Tasks/Animals/Animals';
function initChooseSpellModal(){
    let attackType = document.querySelector('.attack-type');
    let attackButton = document.createElement('button');
    attackButton.addEventListener('click', function(){
      attackType.style.display = "none";
      let taskType = document.querySelector('.task-type');
      taskType.style.display = "flex";
    })
    attackButton.addEventListener('click', function(){
      attackType.style.display = "none";
      let taskType = document.querySelector('.task-type');
      taskType.style.display = "flex";
      taskType.firstChild.focus();  
    })
    attackType.addEventListener('keydown', (event)=>{
      
      if (event.key === 'ArrowRight'){
        document.activeElement.nextSibling.focus();
      } 
      if (event.key === 'ArrowLeft'){
        document.activeElement.previousSibling.focus();
      } 
    })
    attackButton.innerHTML = 'Attack';
    let healButton = document.createElement('button');
    healButton.innerHTML = 'Heal';
    healButton.addEventListener('click', function(){
      attackType.style.display = "none";
      animalsTask();
    })
    
    attackType.appendChild(attackButton);
    attackType.appendChild(healButton);
    
}

export default initChooseSpellModal;