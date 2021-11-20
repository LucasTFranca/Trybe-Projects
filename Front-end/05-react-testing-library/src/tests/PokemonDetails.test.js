import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
// import userEvent from '@testing-library/user-event';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const onUpdateFavoritePokemons = (pokemonId, isFavorite) => (
  this.onUpdateFavoritePokemons(pokemonId, isFavorite)
);

const match = {
  params: {
    id: '25',
  },
};

const isFavorite = {
  4: false,
  10: true,
  23: true,
  25: false,
  65: true,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testing PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado estão na tela.', () => {
    render(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ isFavorite }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
        />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const summaryText = screen.getByText(/Pokémon roasts hard berries with electricity/i);

    expect(heading).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações.', () => {
    render(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ isFavorite }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
        />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Game Locations of Pikachu');

    const mapImage = screen.getAllByAltText('Pikachu location');

    expect(mapImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImage[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    render(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ isFavorite }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
        />
      </MemoryRouter>,
    );

    const labelText = screen.getByText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
