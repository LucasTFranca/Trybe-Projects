const paragraphCount = document.getElementById('carta-contador');
let count;

function randomNumber(size) {
  return Math.floor(Math.random() * (size));
}

function mergeClass(groups, element) {
  let randomIndex;
  for (let key = 0; key < groups.length; key += 1) {
    randomIndex = randomNumber(groups[key].length);
    element.classList.add(groups[key][randomIndex]);
  }
}

function createRandomClass(element) {
  const styleGroup = ['newspaper', 'magazine1', 'magazine2'];
  const sizeGroup = ['medium', 'big', 'reallybig'];
  const rotateGrup = ['rotateleft', 'rotateright'];
  const inclinationGroup = ['skewleft', 'skewright'];
  return mergeClass([styleGroup, sizeGroup, rotateGrup, inclinationGroup], element);
}

function letterGenerate() {
  const input = document.getElementById('carta-texto').value;
  const letter = document.getElementById('carta-gerada');
  letter.innerHTML = '';
  if (input.trim() !== '') {
    const letterList = input.split(' ');
    count = letterList.length;
    paragraphCount.innerText = count;
    for (let key = 0; key < letterList.length; key += 1) {
      const element = document.createElement('span');
      element.innerText = letterList[key];
      createRandomClass(element);
      letter.appendChild(element);
    }
  } else {
    letter.innerText = 'Por favor, digite o conteúdo da carta.';
    count = 0;
    paragraphCount.innerText = count;
  }
}

function init() {
  const buttonLetterGenerate = document.getElementById('criar-carta');

  buttonLetterGenerate.addEventListener('click', letterGenerate);
}

window.onload = () => {
  init();
};
