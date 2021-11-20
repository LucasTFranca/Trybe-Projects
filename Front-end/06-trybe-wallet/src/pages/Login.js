import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonChange = this.buttonChange.bind(this);
    this.validator = this.validator.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonValidator: true,
    };
  }

  validator() {
    const { email, password } = this.state;
    const PASSWORD_LIMIT = 5;
    const regex = /\S+@\S+\.\S+/;
    const result = regex.test(email);

    if (password.length >= PASSWORD_LIMIT && result) {
      this.setState({ buttonValidator: false });
    }
  }

  handleChange({ target }) {
    const { value, type } = target;
    this.setState({ [type]: value });
    this.validator();
  }

  buttonChange() {
    const { history, add } = this.props;
    const { email } = this.state;
    add(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, buttonValidator } = this.state;
    return (
      <form method="get">
        <label htmlFor="email">
          Email:
          <input
            id="email"
            data-testid="email-input"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>
        <button
          disabled={ buttonValidator }
          onClick={ this.buttonChange }
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(userAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
