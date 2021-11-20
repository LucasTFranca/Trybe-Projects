import React from 'react';
import PropTypes from 'prop-types';

export default class RatingInput extends React.Component {
  render() {
    const { handleChange, rating } = this.props;

    return (
      <label data-testid="rating-input-label" htmlFor="rating-input">
        Avaliação
        <input
          data-testid="rating-input"
          name="rating"
          value={ rating }
          onChange={ handleChange }
          type="number"
        />
      </label>
    );
  }
}

RatingInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};
