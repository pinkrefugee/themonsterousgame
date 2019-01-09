const firstNamePart = ['Mental', 'Hungry','Suspicious', 'Narrow', 'Mean'];
const secondNamePart = ['Bishop', 'Doctor', 'Barber', 'Butcher', 'Postman'];
const thirdNamePart = ['Chris', 'Bill', 'Dave', 'Mike', 'Miles'];

function setMonsterName(){
    let firstNameIndex = Math.floor(Math.random() * firstNamePart.length);
    let secondNameIndex = Math.floor(Math.random() * secondNamePart.length);
    let thirdNameIndex = Math.floor(Math.random() * thirdNamePart.length);
    let monsterName = `${firstNamePart[firstNameIndex]} ${secondNamePart[secondNameIndex]} ${thirdNamePart[thirdNameIndex]}`;
    return monsterName;
}
export default setMonsterName;