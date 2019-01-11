import animalsTask from '../Tasks/Animals/Animals';
function initChooseSpellModal(){
    let attackType = document.querySelector('.attack-type');
    let attackButton = document.createElement('button');
    attackButton.addEventListener('click', function(){
      attackType.style.display = "none";
      let taskType = document.querySelector('.task-type');
      taskType.style.display = "flex";
    })
    attackButton.innerHTML = 'Attack'
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