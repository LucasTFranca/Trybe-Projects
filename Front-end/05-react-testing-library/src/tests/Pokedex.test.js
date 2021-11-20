import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

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

describe('Testing Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavorite } />
      </MemoryRouter>,
    );
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavorite } />
      </MemoryRouter>,
    );
    const buttonProxPokemon = screen.getByText('Próximo pokémon');

    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(buttonProxPokemon);

    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavorite } />
      </MemoryRouter>,
    );
    const nextButton = screen.getByText('Próximo pokémon');
    const typeButtonNumber = 7;

    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();

    const eletricButton = screen.getByRole('button', {
      name: 'Electric',
    });
    expect(eletricButton).toBeInTheDocument();

    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(fireButton).toBeInTheDocument();

    const bugButton = screen.getByRole('button', {
      name: 'Bug',
    });
    expect(bugButton).toBeInTheDocument();

    userEvent.click(eletricButton);

    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(fireButton);

    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();

    userEvent.click(nextButton);

    const rapidashText = screen.getByText('Rapidash');
    expect(rapidashText).toBeInTheDocument();

    userEvent.click(bugButton);

    const caterpieText = screen.getByText('Caterpie');
    expect(caterpieText).toBeInTheDocument();

    userEvent.click(allButton);

    const allButtonText = screen.getByText('Pikachu');
    expect(allButtonText).toBeInTheDocument();

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons.length).toBe(typeButtonNumber);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavorite } />
      </MemoryRouter>,
    );
    const buttonProxPokemon = screen.getByTestId('next-pokemon');
    const buttonEletric = screen.getByRole('button', {
      name: 'Electric',
    });

    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allButton).toBeInTheDocument();

    userEvent.click(buttonEletric);
    userEvent.click(allButton);

    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(buttonProxPokemon);

    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();
  });
});
