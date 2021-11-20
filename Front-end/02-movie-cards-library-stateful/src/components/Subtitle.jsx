import React from 'react';
import PropTypes from 'prop-types';

export default class Subtitle extends React.Component {
  render() {
    const { handleChange, subtitle } = this.props;

    return (
      <label data-testid="subtitle-input-label" htmlFor="subtitle-input">
        Subtítulo
        <input
          data-testid="subtitle-input"
          name="subtitle"
          value={ subtitle }
          onChange={ handleChange }
          type="text"
        />
      </label>
    );
  }
}

Subtitle.propTypes = {
  handleChange: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
};
