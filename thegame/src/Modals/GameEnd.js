import globalObj from "../Controllers/GameController";

function gameEnd(message){
    if(localStorage.length > 10) localStorage.clear();
    localStorage.setItem(globalObj.player.name, globalObj.enemiesCount);
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
    
    let table = document.createElement('table');
    for (let i = 0; i < localStorage.length; i++)  
    {  
        let key = localStorage.key(i);  
        if(key!=='loglevel:webpack-dev-server'){
            let tr = document.createElement('tr');   

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            
            let text1 = document.createTextNode(key);
            let text2 = document.createTextNode(localStorage.getItem(key));
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            if(key === globalObj.player.name) {
                td1.classList.add('bold');
                td2.classList.add('bold');
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
        
            table.appendChild(tr);
            console.log(key);
            console.log(localStorage.getItem(key));
        }
    }  
    endModal.appendChild(table);
    endModal.appendChild(endButton);
    endButton.focus();
}
export default gameEnd;

