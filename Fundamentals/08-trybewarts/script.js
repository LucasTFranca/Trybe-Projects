function checkLogin(event) {
  event.preventDefault();
  const inputLogin = document.getElementById('login').value;
  const inputPassword = document.getElementById('password').value;

  if (inputLogin === 'tryber@teste.com' && inputPassword === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }

  console.log(typeof inputLogin, typeof inputPassword);
}

function verifyAgreement() {
  const buttonSubmit = document.getElementById('submit-btn');

  if (buttonSubmit.disabled) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}

function createCount(event) {
  const eventValue = event.target.value;
  const labelCount = document.getElementById('counter');

  labelCount.innerText = 500 - eventValue.length;
}

function checkedFamily() {
  const family = document.getElementsByName('family');
  for (let key = 0; key < family.length; key += 1) {
    if (family[key].checked) {
      return family[key].value;
    }
  }
}

function checkedContent() {
  const content = document.getElementsByName('content');
  const allContent = [];
  for (let key = 0; key < content.length; key += 1) {
    if (content[key].checked) {
      allContent.push(` ${content[key].value}`);
    }
  }
  return String(allContent);
}

function checkedRate() {
  const rate = document.getElementsByName('rate');
  for (let key = 0; key < rate.length; key += 1) {
    if (rate[key].checked) {
      return rate[key].value;
    }
  }
}

function submitForm(event) {
  event.preventDefault();
  const family = checkedFamily();
  const content = checkedContent();
  const rate = checkedRate();
  const form = document.getElementById('evaluation-form');
  const name = document.getElementById('input-name');
  const lastName = document.getElementById('input-lastname');
  const email = document.getElementById('input-email');
  const house = document.getElementById('house');
  const textarea = document.getElementById('textarea');
  form.innerHTML = `Nome: ${name.value} ${lastName.value} <br>
    Email: ${email.value} <br>
    Casa: ${house.value} <br>
    Família: ${family} <br>
    Matérias: ${content} <br>
    Avaliação: ${rate} <br>
    Observações: ${textarea.value}`;
}

window.onload = () => {
  const buttonLogin = document.getElementById('buttonLogin');
  const buttonSubmit = document.getElementById('submit-btn');
  const checkboxAgreement = document.getElementById('agreement');
  const textarea = document.getElementById('textarea');

  buttonLogin.addEventListener('click', checkLogin);
  buttonSubmit.addEventListener('click', submitForm);
  checkboxAgreement.addEventListener('change', verifyAgreement);
  textarea.addEventListener('keyup', createCount);
};
