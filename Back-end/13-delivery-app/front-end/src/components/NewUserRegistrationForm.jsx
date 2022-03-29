import React, { useState, useEffect, useContext } from 'react';
import CustomerContext from '../context/customer/CustomerContext';
import { requestToAdminRegister } from '../helpers';

function NewUserRegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [disableButton, changeButtonState] = useState(true);
  const { user: { token } } = useContext(CustomerContext);
  const [registerResult, changeRegisterResult] = useState('');

  useEffect(() => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const MIN_NAME_LENGTH = 12;
    const MIN_PASSWORD_LENGTH = 6;
    const isValidName = name.length >= MIN_NAME_LENGTH;
    const isValidEmail = regex.test(email);
    const isValidPassword = password.length >= MIN_PASSWORD_LENGTH;
    if (isValidEmail && isValidName && isValidPassword) {
      return changeButtonState(false);
    }
  }, [name.length, email, password.length, role]);

  const registerNewUser = async () => {
    const newUser = {
      name,
      email,
      password,
      role,
    };
    const result = await requestToAdminRegister(newUser, token);
    if (result.id) {
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      changeRegisterResult('Sucess!');
      const THREE_SECONDS = 3000;
      setTimeout(() => {
        changeRegisterResult('');
      }, THREE_SECONDS);
      return;
    }
    if (result.error.status) {
      changeRegisterResult(result.error.message);
      const THREE_SECONDS = 3000;
      setTimeout(() => {
        changeRegisterResult('');
      }, THREE_SECONDS);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>

      <form>
        <legend>Nome</legend>
        <input
          data-testid="admin_manage__input-name"
          onChange={ ({ target }) => setName(target.value) }
          type="text"
          placeholder="Nome e sobrenome"
        />

        <legend>Email</legend>
        <input
          data-testid="admin_manage__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          placeholder="seu-email@site.com.br"
        />

        <legend>Senha</legend>
        <input
          data-testid="admin_manage__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          placeholder="**********"
        />

        <legend>Tipo</legend>
        <select
          data-testid="admin_manage__select-role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">P.Vendedora</option>
          <option value="admin">P.Administradora</option>
        </select>

        <button
          data-testid="admin_manage__button-register"
          disabled={ disableButton }
          onClick={ () => registerNewUser() }
          type="button"
        >
          CADASTRAR
        </button>
      </form>
      <div
        data-testid="admin_manage__element-invalid-register"
      >
        { registerResult !== '' && registerResult }
      </div>
    </div>
  );
}

export default NewUserRegistrationForm;
