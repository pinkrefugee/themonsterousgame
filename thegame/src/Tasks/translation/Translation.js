import words from './dictionary';
import getAnswer from '../../app';

function translateTask(){
    let translateTaskContainer = document.querySelector('.translate-task');
    translateTaskContainer.style.display = "flex";
    let givenWord = document.createElement('div');
    let wordIndex = Math.floor(Math.random() * words.length);
    givenWord.innerHTML = words[wordIndex].word;
    translateTaskContainer.appendChild(givenWord);
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    translateTaskContainer.appendChild(input);

    translateTaskContainer.addEventListener('keydown', (event)=>{
      
      if (event.key === 'ArrowRight'){
        document.activeElement.nextSibling.focus();
      } 
      if (event.key === 'ArrowLeft'){
        document.activeElement.previousSibling.focus();
      } 
    })

    let translateAnswerButton = document.createElement('button');
    translateAnswerButton.innerHTML = 'Answer';
    translateAnswerButton.addEventListener('click', function(){
      translateTaskContainer.style.display = "none";
      while (translateTaskContainer.firstChild) {
        translateTaskContainer.removeChild(translateTaskContainer.firstChild);
      }
      let modal = document.querySelector('.modal');
      modal.style.display = "none";
      if(words[wordIndex].translation.includes(input.value)){
        getAnswer(true);
      }
      else {
        getAnswer(false);
      }    
  
    });
    translateTaskContainer.appendChild(translateAnswerButton);
    input.focus();
  }

  export default translateTask;