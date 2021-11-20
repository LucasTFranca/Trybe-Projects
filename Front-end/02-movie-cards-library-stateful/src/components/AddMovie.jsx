import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Subtitle from './Subtitle';
import ImagePath from './ImagePath';
import Storyline from './Storyline';
import RatingInput from './RatingInput';
import Select from './Select';
import Button from './Button';

export default class AddMovie extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(action) {
    action(this.state);
    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  render() {
    const { onClick } = this.props;
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <section>
        <form data-testid="add-movie-form">
          <Title handleChange={ this.handleChange } title={ title } />
          <Subtitle handleChange={ this.handleChange } subtitle={ subtitle } />
          <ImagePath handleChange={ this.handleChange } imagePath={ imagePath } />
          <Storyline handleChange={ this.handleChange } storyline={ storyline } />
          <RatingInput handleChange={ this.handleChange } rating={ rating } />
          <Select handleChange={ this.handleChange } genre={ genre } />
          <Button onClick={ () => this.handleClick(onClick) } />
        </form>
      </section>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};
