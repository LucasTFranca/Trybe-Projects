/* eslint-disable guard-for-in */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
// Desafio 10
function techList(tech, nome) {
  // verificar nomes da array e criar um objeto para cada um
  let arrayOutPut = [];
  let array = tech.sort();
  if (array.length === 0) {
    return 'Vazio!';
  }
  // eslint-disable-next-line guard-for-in
  for (let key in array) {
    arrayOutPut[key] = {
      tech: array[key],
      name: nome,
    };
  }
  return arrayOutPut;
}

// Desafio 11
function generatePhoneNumber(array) {
  let phoneNumber = '';
  let repeat = 0;
  // diferente de 11 return "Array com tamanho incorreto."
  if (array.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  // Caso algum dos números da array seja menor que 0, maior que 9 ou se repita 3 vezes ou mais return "não é possível gerar um número de telefone com esses valores"
  for (let key in array) {
    // verificar quantas vezes repete
    const erro = 'não é possível gerar um número de telefone com esses valores';
    if (array[key] < 0) {
      return erro;
    } if (array[key] > 9) {
      return erro;
    }
    repeat = 0;
    for (let index in array) {
      if (array[key] === array[index]) {
        repeat += 1;
      }
      if (repeat >= 3) {
        return 'não é possível gerar um número de telefone com esses valores';
      }
    }
  }
  phoneNumber = (`(${array[0]}${array[1]}) ${array[2]}${array[3]}${array[4]}${array[5]}${array[6]}-${array[7]}${array[8]}${array[9]}${array[10]}`);

  return phoneNumber;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let list = [lineA, lineB, lineC];
  let menores = [];
  // verificar se um dos 3 lados e maior q a soma da medidas dos outros dois && maior que o valor Math.abs() da diferenca entra as medidas
  for (let key in list) {
    if (list[key] === lineA) {
      if (lineA < lineB + lineC) {
        menores.push(lineA);
      }
    } else if (list[key] === lineB) {
      if (lineB < lineA + lineC) {
        menores.push(lineB);
      }
    } else if (list[key] === lineC) {
      if (lineC < lineA + lineB) {
        menores.push(lineC);
      }
    }
  }

  for (let key in menores) {
    if (menores[key] === lineA) {
      if (menores[key] > Math.abs(lineB - lineC)) {
        return true;
      }
    } else if (menores[key] === lineB) {
      if (menores[key] > Math.abs(lineA - lineC)) {
        return true;
      }
    } else if (menores[key] === lineC) {
      if (menores[key] > Math.abs(lineA - lineB)) {
        return true;
      }
    }
  }
  return false;
}

// Desafio 13
function hydrate(word) {
  let regex = /\d+/g;
  let matches = word.match(regex);
  let numberMatches = 0;
  let shorts = 0;

  for (let key in matches) {
    numberMatches = parseInt(matches[key]);
    shorts += numberMatches;
  }
  if (shorts === 1) {
    return `${shorts} copo de água`;
  }
  return `${shorts} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
