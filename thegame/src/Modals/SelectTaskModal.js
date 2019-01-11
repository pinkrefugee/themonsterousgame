import arithmeticTask from '../Tasks/Arithmetic/Arithmetic';
import listeningComprehensionTask from '../Tasks/ListeningComprehension/ListeningComprehension';
import translateTask from '../Tasks/translation/Translation';
function initChooseTaskModal(){
    let taskType = document.querySelector('.task-type');

    taskType.addEventListener('keydown', (event)=>{
      if (event.key === 'ArrowRight'){
        document.activeElement.nextSibling.focus();
      } 
      if (event.key === 'ArrowLeft'){
        document.activeElement.previousSibling.focus();
      } 
    })

    let arithmeticButton = document.createElement('button');
    arithmeticButton.innerHTML = 'Arithmetic';
    taskType.appendChild(arithmeticButton);
    arithmeticButton.addEventListener('click', function(){
      taskType.style.display = "none";
      arithmeticTask();
    })
    let translateButton = document.createElement('button');
    translateButton.innerHTML = 'Translation';
    taskType.appendChild(translateButton);
    translateButton.addEventListener('click', function(){
      taskType.style.display = "none";
      translateTask();
    })
    let listenButton = document.createElement('button');
    listenButton.innerHTML = 'Listening Comprehension';
    taskType.appendChild(listenButton);
    listenButton.addEventListener('click', function(){
      taskType.style.display = "none";
      listeningComprehensionTask();
    })

   
  }
  export default initChooseTaskModal;
  