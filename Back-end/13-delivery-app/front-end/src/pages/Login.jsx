import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestToLogin, requestToValidateToken } from '../helpers';
import CustomerContext from '../context/customer/CustomerContext';

function Login(props) {
  const { history } = props;

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginButtonUnlock, setLoginButtonUnlock] = useState(true);

  const { setUser } = useContext(CustomerContext);

  const passwordLength = 6;

  const flowDictionary = {
    administrator: '/admin/manage',
    seller: '/seller/orders',
    customer: '/customer/products',
  };

  useEffect(() => {
    async function validateIfHaveUser() {
      const userStorage = JSON.parse(localStorage.user);

      if (userStorage) {
        const user = await requestToValidateToken(userStorage.token);
        setUser(user);

        history.push(flowDictionary[user.role]);
      }
    }

    if (localStorage.user) validateIfHaveUser();
  }, [flowDictionary, history, setUser]);

  function redirectToRegister() {
    history.push('/register');
  }

  async function redirectPage() {
    const user = await requestToLogin(loginValue, passwordValue);
    if (!user.error) {
      localStorage.clear();
      localStorage.user = JSON.stringify(user);
      await setUser(user);

      return history.push(flowDictionary[user.role]);
    }

    setErrorMessage(user.error.message);
  }

  function handleChange({ target }) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (target.id === 'common_login__input-email') {
      const emailValidation = emailRegex.test(target.value);

      if (emailValidation && passwordValue.length >= passwordLength) {
        setLoginButtonUnlock(false);
      } else setLoginButtonUnlock(true);

      return setLoginValue(target.value);
    }
    const emailValidation = emailRegex.test(loginValue);

    if (emailValidation && target.value.length >= passwordLength) {
      setLoginButtonUnlock(false);
    } else setLoginButtonUnlock(true);

    return setPasswordValue(target.value);
  }

  return (
    <div>
      <label htmlFor="common_login__input-email">
        Login
        <input
          value={ loginValue }
          onChange={ handleChange }
          id="common_login__input-email"
          data-testid="common_login__input-email"
          type="email"
        />
      </label>
      <label htmlFor="common_login__input-password">
        Senha
        <input
          value={ passwordValue }
          onChange={ handleChange }
          id="common_login__input-password"
          data-testid="common_login__input-password"
          type="password"
        />
      </label>
      <button
        onClick={ redirectPage }
        data-testid="common_login__button-login"
        disabled={ loginButtonUnlock }
        type="button"
      >
        LOGIN
      </button>
      <button
        onClick={ redirectToRegister }
        data-testid="common_login__button-register"
        type="button"
      >
        Ainda não tenho conta
      </button>
      <p data-testid="common_login__element-invalid-email">{errorMessage}</p>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
