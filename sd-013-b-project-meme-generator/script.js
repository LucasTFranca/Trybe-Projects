function createText() {
  const paragraph = document.getElementById('meme-text');
  const input = document.getElementById('text-input');
  paragraph.innerText = input.value;
}

function changeBorderImg(event) {
  const element = event.target;
  const imgContainer = document.getElementById('meme-image-container');
  if (element.id === 'fire') {
    imgContainer.style.border = 'dashed red 3px';
  } else if (element.id === 'water') {
    imgContainer.style.border = 'double blue 5px';
  } else {
    imgContainer.style.border = 'groove green 6px';
  }
}

function changeImg(event) {
  const element = event.target;
  const img = document.getElementById('meme-image');
  // img.src = element.src;
  if (element.id === 'meme-1') {
    img.src = 'imgs/meme1.png';
  } else if (element.id === 'meme-2') {
    img.src = 'imgs/meme2.png';
  } else if (element.id === 'meme-3') {
    img.src = 'imgs/meme3.png';
  } else {
    img.src = 'imgs/meme4.png';
  }
}

function loadFile(event) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById('meme-image');
    img.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function init() {
  const input = document.getElementById('text-input');
  const inputFile = document.getElementById('meme-insert');
  const buttonFire = document.getElementById('fire');
  const buttonWater = document.getElementById('water');
  const buttonEarth = document.getElementById('earth');
  const meme1 = document.getElementById('meme-1');
  const meme2 = document.getElementById('meme-2');
  const meme3 = document.getElementById('meme-3');
  const meme4 = document.getElementById('meme-4');
  input.addEventListener('keyup', createText);
  buttonFire.addEventListener('click', changeBorderImg);
  buttonWater.addEventListener('click', changeBorderImg);
  buttonEarth.addEventListener('click', changeBorderImg);
  meme1.addEventListener('click', changeImg);
  meme2.addEventListener('click', changeImg);
  meme3.addEventListener('click', changeImg);
  meme4.addEventListener('click', changeImg);
  inputFile.onchange = loadFile;
}

window.onload = () => {
  init();
};
