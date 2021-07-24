/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
// Desafio 1
function compareTrue(value1, value2) {
  if (value1 === true && value2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(word) {
  // Fazer um looping que verifica toda a frase
  let verify = ''; // precisa receber cada caracter de word
  let arraySplit = [];
  for (let key of word) {
    // Se tiver espaco eu adiciono o que foi verificado na array e zero a let de verify
    if (key === ' ') {
      arraySplit.push(verify);
      verify = '';
    } else {
      verify += key;
    }
  }
  // no final ele adiciona tudo da let verify na array na ultima posicao
  arraySplit.push(verify);
  return arraySplit;
}

// Desafio 4
function concatName(array) {
  let itens = '';
  itens = (array[array.length - 1]);
  itens += (`, ${array[0]}`);
  return itens;
}

// Desafio 5
function footballPoints(wins, ties) {
  let pontos = 0;
  // verificar quantas wins e adicionar no placar
  pontos = wins * 3;
  // verificar quantos empates e adicionar no placar
  pontos += ties;
  return pontos;
}

// Desafio 6
function highestCount(array) {
  let repeat = 0;
  let numMaior = 0;
  let qntNegative = 0;
  // verificar qual e o maior numero do array
  for (let key in array) {
    // comparar numero por numero para saber qual e o maior
    if (array[key] > numMaior) {
      numMaior = array[key];
    }
  }
  // verificar se todos os numeros sao negativos
  for (let key in array) {
    if (array[key] < 0) {
      qntNegative += 1;
    }
    if (array.length === qntNegative) {
      // verifica qual e o maior numero
      let cont = array.length - 1;
      for (let key in array) {
        if (array[key] > array[cont - key]) {
          numMaior = array[key];
        }
      }
    }
  }
  // verificar quantas vezes o maior numero aparece
  for (let key in array) {
    // comparar numero por numera para ver se e igual a numMaior
    if (array[key] === numMaior) {
      repeat += 1;
    }
  }
  return repeat;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  // verificar qual gato esta mais perto
  let distanciCat1 = Math.abs(mouse - cat1);
  let distanciCat2 = Math.abs(mouse - cat2);
  if (distanciCat2 === distanciCat1) {
    return 'os gatos trombam e o rato foge';
  } if (distanciCat1 < distanciCat2) {
    return 'cat1';
  }
  return 'cat2';
}

// Desafio 8
function fizzBuzz(array) {
  // verificar todos os componetes do array
  let resultados = [];
  for (let key in array) {
    // verificar se e divisivel por 3 e 5
    if (array[key] % 3 === 0 && array[key] % 5 === 0) {
      resultados.push('fizzBuzz');
      // verificar se e divisivel por 3
    } else if (array[key] % 3 === 0) {
      resultados.push('fizz');
      // verificar se e divisivel por 5
    } else if (array[key] % 5 === 0) {
      resultados.push('buzz');
      // se nao for por nd bug
    } else {
      resultados.push('bug!');
    }
  }
  return resultados;
}

// Desafio 9
function encode(word) {
  // verifico todos os caractes
  let caracter = '';
  for (let key in word) {
    // verifico se o caracter e igual a
    if (word[key] === 'a') {
      caracter += '1';
      // verifico se o caracter e igual e
    } else if (word[key] === 'e') {
      caracter += '2';
      // verifico se o caracter e igual i
    } else if (word[key] === 'i') {
      caracter += '3';
      // verifico se o caracter e igual o
    } else if (word[key] === 'o') {
      caracter += '4';
      // verifico se o caracter e igual u
    } else if (word[key] === 'u') {
      caracter += '5';
    } else {
      caracter += word[key];
    }
  }
  return caracter;
}

function decode(word) {
  let caracter = '';
  for (let key in word) {
    // verifico se o caracter e igual a
    if (word[key] === '1') {
      caracter += 'a';
      // verifico se o caracter e igual e
    } else if (word[key] === '2') {
      caracter += 'e';
      // verifico se o caracter e igual i
    } else if (word[key] === '3') {
      caracter += 'i';
      // verifico se o caracter e igual o
    } else if (word[key] === '4') {
      caracter += 'o';
      // verifico se o caracter e igual u
    } else if (word[key] === '5') {
      caracter += 'u';
    } else {
      caracter += word[key];
    }
  }
  return caracter;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
