import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hash: '',
    };
    this.updateHash = this.updateHash.bind(this);
  }

  componentDidMount() {
    const { player: { gravatarEmail } } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.updateHash(hash);
  }

  updateHash(hash) {
    this.setState({ hash });
  }

  render() {
    const { hash } = this.state;
    const { player: { name, score, gravatarEmail } } = this.props;
    if (!name && !gravatarEmail) {
      return (
        <header>
          <div>
            <h1>HEADER</h1>
          </div>
        </header>
      );
    }
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="imagem Perfil"
          />
          <h1>HEADER</h1>
        </div>
        <div>
          <span data-testid="header-player-name">{name}</span>
          <p>
            Points:
            { ' ' }
            <span data-testid="header-score">{score}</span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(Header);
