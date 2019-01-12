import getAnswer from '../../app';
import globalObj from '../../Controllers/GameController';

const animals = ["seal", "dog", "cat", "pig"];
function animalsTask(){
    let animalsTaskContainer = document.querySelector('.animals-task');
    animalsTaskContainer.addEventListener('keydown', (event)=>{
      
      if (event.key === 'ArrowDown'){
        document.activeElement.nextSibling.focus();
      } 
      if (event.key === 'ArrowUp'){
        document.activeElement.previousSibling.focus();
      } 
    })
    animalsTaskContainer.style.display = "flex";
    let animalImage = document.createElement('img');
    let animalIndex = Math.floor(Math.random() * animals.length);
    animalImage.src = "Tasks/Animals/AnimalsImages/" + animals[animalIndex] + ".jpg";

    let animalInput = document.createElement('input');
    animalInput.setAttribute("type", "text");

    let animalsAnswerButton = document.createElement('button');
    animalsAnswerButton.innerHTML = 'Answer';
    animalsAnswerButton.addEventListener('click', function(){
        animalsTaskContainer.style.display = "none";
      while (animalsTaskContainer.firstChild) {
        animalsTaskContainer.removeChild(animalsTaskContainer.firstChild);
      }
      let modal = document.querySelector('.modal');
      modal.style.display = "none";
      if(animalInput.value === animals[animalIndex]){
        getAnswer(true, 'heal');
      }
      else{
        getAnswer(false, 'heal');
      };
    })

    animalsTaskContainer.appendChild(animalImage);
    animalsTaskContainer.appendChild(animalInput);
    animalsTaskContainer.appendChild(animalsAnswerButton);
    animalInput.focus();
}
export default animalsTask;