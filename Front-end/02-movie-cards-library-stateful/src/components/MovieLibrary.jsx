import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

export default class MovieLibrary extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  handleChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
    this.handleFilterChange();
  }

  handleFilterChange() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;
    const bookmarkedFiltered = movies
      .filter(({ bookmarked }) => (bookmarkedOnly ? bookmarked : movies));
    const filteredMovies = bookmarkedFiltered.filter(({ title, subtitle, storyline }) => (
      title.includes(searchText) || subtitle.includes(searchText)
      || storyline.includes(searchText)
    ));
    const filteredGenre = filteredMovies
      .filter(({ genre }) => (selectedGenre ? genre === selectedGenre : movies));
    return filteredGenre;
  }

  onClick(state) {
    const { movies } = this.state;
    this.setState({
      movies: [...movies, state],
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleChange }
        />
        <MovieList movies={ this.handleFilterChange() } />
        <AddMovie onClick={ this.onClick } />
      </>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
