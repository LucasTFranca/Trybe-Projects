import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { requestToRegister } from '../helpers';
import CustomerContext from '../context/customer/CustomerContext';

function Register(props) {
  const { history } = props;

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginButtonUnlock, setLoginButtonUnlock] = useState(true);

  const { setUser } = useContext(CustomerContext);

  const passwordLength = 6;
  const nameLength = 12;

  async function redirectPage() {
    const user = await requestToRegister(nameValue, emailValue, passwordValue);
    if (!user.error) {
      localStorage.clear();
      localStorage.user = JSON.stringify(user);
      await setUser(user);

      return history.push('/customer/products');
    }

    setErrorMessage(user.error.message);
  }

  function handleChange({ target }) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const handleChangeDictionary = {
      'common_register__input-name': () => {
        const emailValidation = emailRegex.test(emailValue);

        if (target.value.length >= nameLength && emailValidation
          && passwordValue.length >= passwordLength) {
          setLoginButtonUnlock(false);
        } else {
          setLoginButtonUnlock(true);
        }

        setNameValue(target.value);
      },
      'common_register__input-email': () => {
        const emailValidation = emailRegex.test(target.value);

        if (nameValue.length >= nameLength && emailValidation
          && passwordValue.length >= passwordLength) {
          setLoginButtonUnlock(false);
        } else {
          setLoginButtonUnlock(true);
        }

        setEmailValue(target.value);
      },
      'common_register__input-password': () => {
        const emailValidation = emailRegex.test(emailValue);

        if (nameValue.length >= nameLength && emailValidation
          && target.value.length >= passwordLength) {
          setLoginButtonUnlock(false);
        } else {
          setLoginButtonUnlock(true);
        }

        setPasswordValue(target.value);
      },
    };

    handleChangeDictionary[target.id]();
  }

  return (
    <div>
      <label htmlFor="common_register__input-name">
        Nome
        <input
          value={ nameValue }
          onChange={ handleChange }
          id="common_register__input-name"
          data-testid="common_register__input-name"
          type="email"
        />
      </label>
      <label htmlFor="common_register__input-email">
        Email
        <input
          value={ emailValue }
          onChange={ handleChange }
          id="common_register__input-email"
          data-testid="common_register__input-email"
          type="email"
        />
      </label>
      <label htmlFor="common_register__input-password">
        Senha
        <input
          value={ passwordValue }
          onChange={ handleChange }
          id="common_register__input-password"
          data-testid="common_register__input-password"
          type="password"
        />
      </label>
      <button
        onClick={ redirectPage }
        id="common_register__button-register"
        data-testid="common_register__button-register"
        disabled={ loginButtonUnlock }
        type="button"
      >
        CADASTRAR
      </button>
      <p data-testid="common_register__element-invalid_register">{errorMessage}</p>
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Register;
