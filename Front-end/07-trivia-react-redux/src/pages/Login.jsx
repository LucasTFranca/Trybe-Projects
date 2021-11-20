import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tokenActionThunk, setPlayerValueAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.loginValidator = this.loginValidator.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
    this.buttonChange = this.buttonChange.bind(this);

    this.state = {
      name: '',
      email: '',
      buttonValidator: true,
    };
  }

  componentDidMount() {
    const { tokenRequest } = this.props;
    tokenRequest();
  }

  handleChange({ target }) {
    const { value, id } = target;
    this.setState({ [id]: value }, () => this.loginValidator());
  }

  handleClickConfig() {
    const { history } = this.props;

    history.push('/config');
  }

  loginValidator() {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);

    if (emailVerify && name) {
      this.setState({ buttonValidator: false });
    }
  }

  buttonChange() {
    const { history, token, setPlayerValue } = this.props;
    setPlayerValue(this.state);
    localStorage.token = token;
    history.push('/game');
  }

  render() {
    const { email, name, buttonValidator } = this.state;
    return (
      <form method="get">
        <label htmlFor="email">
          Name:
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="password">
          Email:
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ buttonValidator }
          onClick={ this.buttonChange }
          type="button"
        >
          Entrar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  tokenRequest: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayerValue: (payload) => dispatch(setPlayerValueAction(payload)),
  tokenRequest: () => dispatch(tokenActionThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
