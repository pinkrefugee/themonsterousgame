import getAnswer from '../../app';

const listeningComprehensionWords = ['suddenly', 'frozen', 'developer', 'significant', 'beverage'];

function listeningComprehensionTask(){
    let listeningTaskContainer = document.querySelector('.listen-task');
    listeningTaskContainer.style.display = "flex";
  
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    listeningTaskContainer.appendChild(input);
  
    let pronounceWordButton = document.createElement('button');
    pronounceWordButton.innerHTML = 'Listen';
    let wordIndex = Math.floor(Math.random() * listeningComprehensionWords.length);
    pronounceWordButton.addEventListener('click', function(){
      let synth = window.speechSynthesis;
      let speech = new SpeechSynthesisUtterance(listeningComprehensionWords[wordIndex]);
      speech.lang = 'en-GB';
      synth.speak(speech);
    })
    listeningTaskContainer.appendChild(pronounceWordButton);
  
    let listeningAnswerButton = document.createElement('button');
    listeningAnswerButton.innerHTML = 'Answer';
  
    listeningAnswerButton.addEventListener('click', function(){
      listeningTaskContainer.style.display = "none";
      while (listeningTaskContainer.firstChild) {
        listeningTaskContainer.removeChild(listeningTaskContainer.firstChild);
      }
      let modal = document.querySelector('.modal');
      modal.style.display = "none";
      if(input.value === listeningComprehensionWords[wordIndex]){
        getAnswer(true)
      }
      else {
        getAnswer(false);
      }    
  
    });
    listeningTaskContainer.appendChild(listeningAnswerButton); 
  
  }
export default listeningComprehensionTask;  