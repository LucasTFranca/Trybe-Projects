import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();
    this.fetchMovie = this.fetchMovie.bind(this);

    this.state = {
      movies: [],
      loadingState: true,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    this.setState({ loadingState: true }, async () => {
      const movies = await movieAPI.getMovies();
      this.setState({ loadingState: false, movies });
    });
  }

  render() {
    const { movies, loadingState } = this.state;

    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list">
        {
          loadingState ? <Loading /> : movies.map((movie) => (
            <MovieCard key={ movie.title } movie={ movie } />
          ))
        }
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
