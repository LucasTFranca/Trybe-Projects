import React from 'react';
import PropTypes from 'prop-types';

export default class ImagePath extends React.Component {
  render() {
    const { handleChange, imagePath } = this.props;

    return (
      <label data-testid="image-input-label" htmlFor="image-input">
        Imagem
        <input
          data-testid="image-input"
          name="imagePath"
          value={ imagePath }
          onChange={ handleChange }
          type="text"
        />
      </label>
    );
  }
}

ImagePath.propTypes = {
  handleChange: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
};
