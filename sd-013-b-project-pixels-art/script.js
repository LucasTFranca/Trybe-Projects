let divColor = 'rgb(0, 0, 0)';
const divColorPalette = document.querySelector('#color-palette');
const idDivPixelBoard = 'pixel-board';
const idButtonGenerateBoard = 'generate-board';

function createRandomColor() {
  const listRandomNumbers = [];
  for (let key = 0; key < 3; key += 1) {
    listRandomNumbers.push(Math.floor(Math.random() * 255 + 1));
  }
  return `rgb(${listRandomNumbers[0]}, ${listRandomNumbers[1]}, ${listRandomNumbers[2]})`;
}

function createColor() {
  const color = document.createElement('div');
  color.className = 'color';
  color.style.backgroundColor = createRandomColor();
  divColorPalette.appendChild(color);
}

function quantityColor(numberColors) {
  for (let key = 0; key < numberColors; key += 1) {
    createColor();
  }
}

function changeColor() {
  const firstChildColor = document.querySelector('.color');
  firstChildColor.style.backgroundColor = 'rgb(0, 0, 0)';
}

function createLinePixel() {
  const divPixelBoard = document.getElementById(idDivPixelBoard);
  const linePixel = document.createElement('div');
  linePixel.className = 'line-pixel';
  divPixelBoard.appendChild(linePixel);
  return linePixel;
}

function createPixel(linePixel) {
  const divPixelLine = linePixel;
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.style.backgroundColor = 'rgb(255, 255, 255)';
  divPixelLine.appendChild(pixel);
}

function quantityPixelWidth(numberPixels) {
  const linePixel = createLinePixel();
  for (let key = 0; key < numberPixels; key += 1) {
    createPixel(linePixel);
  }
}

function quantityPixelHeight(numberColumns, numberPixels) {
  for (let key = 0; key < numberColumns; key += 1) {
    quantityPixelWidth(numberPixels);
  }
}

function removeSelected(divChildren) {
  for (let key = 0; key < divChildren.length; key += 1) {
    if (divChildren[key].className === 'color selected') {
      divChildren[key].classList.remove('selected');
    }
  }
}

function createSelected(event) {
  const divSelected = event.target;
  const divChildren = document.querySelector('#color-palette').children;
  removeSelected(divChildren);
  divSelected.classList.add('selected');
  divColor = divSelected.style.backgroundColor;
}

function paintPixel(event) {
  const pixelTarget = event;
  if (event.target.className === 'pixel') {
    pixelTarget.target.style.backgroundColor = divColor;
  }
}

function createButtonElement(typeElement, className, text) {
  const element = document.createElement(typeElement);
  const divButtonBoard = document.getElementById('button-board');
  element.id = className;
  element.innerText = text;
  if (typeElement === 'input') {
    element.type = 'number';
    element.min = '1';
  }
  divButtonBoard.appendChild(element);
}

function clearBoard() {
  const pixelsList = document.querySelectorAll('.pixel');
  for (let key = 0; key < pixelsList.length; key += 1) {
    pixelsList[key].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function removePixelBoard() {
  const s = document.getElementById(idDivPixelBoard);
  s.innerHTML = '';
}

function verifyChangePixelBoard(input) {
  if (input > 50) {
    quantityPixelHeight(50, 50);
  } else {
    quantityPixelHeight(5, 5);
  }
}

function changePixelBoard() {
  const input = document.getElementById('board-size');
  if (input.value === '') {
    window.alert('Board inválido!');
  } else if (input.value > 50 || input.value < 5) {
    removePixelBoard();
    verifyChangePixelBoard(input.value);
  } else {
    removePixelBoard();
    quantityPixelHeight(input.value, input.value);
  }
}

function init() {
  quantityColor(4);

  divColorPalette.firstChild.classList.add('selected');

  createButtonElement('button', 'clear-board', 'Limpar');
  createButtonElement('input', 'board-size', '');
  createButtonElement('button', idButtonGenerateBoard, 'Create');

  divColorPalette.addEventListener('click', createSelected);
  document.getElementById(idDivPixelBoard).addEventListener('click', paintPixel);
  document.getElementById('clear-board').addEventListener('click', clearBoard);
  document.getElementById(idButtonGenerateBoard).addEventListener('click', changePixelBoard);

  document.getElementById(idButtonGenerateBoard).textContent = 'VQV';
}

window.onload = () => {
  init();
  changeColor();
  quantityPixelHeight(5, 5);
};
