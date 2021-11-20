import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';

const pokemonProp = {
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
};

describe('Testing Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemonProp } isFavorite={ false } />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Charmander');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Fire');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe('Average weight: 8.5 kg');

    const pokemonImage = screen.getByAltText('Charmander sprite');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemonProp } isFavorite={ false } />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');
    expect(link.href).toBe('http://localhost/pokemons/4');
  });

  it('Teste se ao clicar no link de navegação do Pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ pokemonProp } isFavorite={ false } />
      </Router>,
    );
    const link = screen.getByRole('link');

    userEvent.click(link);

    expect(history.location.pathname).toBe('/pokemons/4');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ pokemonProp } isFavorite />
      </Router>,
    );

    const favoriteImage = screen.getByAltText('Charmander is marked as favorite');

    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
  });
});
