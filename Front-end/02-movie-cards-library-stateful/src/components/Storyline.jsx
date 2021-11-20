import React from 'react';
import PropTypes from 'prop-types';

export default class Storyline extends React.Component {
  render() {
    const { handleChange, storyline } = this.props;

    return (
      <label data-testid="storyline-input-label" htmlFor="storyline-input">
        Sinopse
        <textarea
          data-testid="storyline-input"
          name="storyline"
          value={ storyline }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Storyline.propTypes = {
  handleChange: PropTypes.func.isRequired,
  storyline: PropTypes.string.isRequired,
};
