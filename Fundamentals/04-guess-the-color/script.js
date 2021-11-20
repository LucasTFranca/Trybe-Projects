const idColorSelector = 'color-selector';
let points = 0;
let click;

function createColor(r, g, b) {
  const colorSelector = document.getElementById(idColorSelector);
  const element = document.createElement('div');
  element.classList.add('ball');
  element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  colorSelector.appendChild(element);
}

function quantityColors(quantity) {
  for (let key = 0; key < quantity; key += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    createColor(r, g, b);
  }
}

function chosen() {
  const colorText = document.getElementById('rgb-color');
  const listColors = document.getElementsByClassName('ball');
  const theChoice = Math.floor(Math.random() * 6);
  const chosenColor = listColors[theChoice].style.backgroundColor;
  listColors[theChoice].classList.add('chosen');
  colorText.innerText = chosenColor.replace(/rgb/, '');
}

function createSelected(event) {
  const answer = document.getElementById('answer');
  const score = document.getElementById('score');
  const element = event.target;
  const classChosen = element.classList;
  if (click !== true && classChosen.contains('ball')) {
    if (classChosen.contains('chosen')) {
      answer.innerText = 'Acertou!';
      points += 3;
    } else {
      answer.innerText = 'Errou! Tente novamente!';
      points -= 1;
    }
    score.innerText = points;
    click = true;
  }
}

function restartGame() {
  const colorSelector = document.getElementById(idColorSelector);
  const answer = document.getElementById('answer');
  colorSelector.innerHTML = '';
  click = false;
  answer.innerText = 'Escolha uma cor';
  quantityColors(6);
  chosen();
}

function init() {
  const colorSelector = document.getElementById(idColorSelector);
  const buttonRestart = document.getElementById('reset-game');

  colorSelector.addEventListener('click', createSelected);
  buttonRestart.addEventListener('click', restartGame);
}

window.onload = () => {
  quantityColors(6);
  chosen();
  init();
};
