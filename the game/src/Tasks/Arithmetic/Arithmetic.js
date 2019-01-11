import getAnswer from '../../app';


function arithmeticTask(){
    let arithmeticContainer = document.querySelector('.arithmetic-task');
    arithmeticContainer.style.display = "flex";
    let expression = document.createElement('div');
  
    const operations = ['+', '-', '*'];
    let firstNumber = Math.floor(Math.random() * 100);
    let secondNumber = Math.floor(Math.random() * 100);
    let operationIndex = Math.floor(Math.random() * 3);
    let a = '' + firstNumber + operations[operationIndex] + secondNumber;
    expression.innerText = a + ' =';
    
    
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    
  
    let arithmeticAnswerButton = document.createElement('button');
    arithmeticAnswerButton.innerHTML = 'Answer';
    arithmeticAnswerButton.addEventListener('click', function(){
      arithmeticContainer.style.display = "none";
      while (arithmeticContainer.firstChild) {
        arithmeticContainer.removeChild(arithmeticContainer.firstChild);
      }
      let modal = document.querySelector('.modal');
      modal.style.display = "none";
      if(input.value == eval(a)){
        getAnswer(true);
      }
      else{
        getAnswer(false);
      };
    })
  
    arithmeticContainer.appendChild(expression);
    arithmeticContainer.appendChild(input);
    arithmeticContainer.appendChild(arithmeticAnswerButton);
  
  }

  export default arithmeticTask;