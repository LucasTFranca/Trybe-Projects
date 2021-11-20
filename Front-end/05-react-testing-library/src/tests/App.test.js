import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing App', () => {
  it('Teste se a aplicação contém um conjunto fixo de links de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', {
      name: 'Home',
    });

    const about = screen.getByRole('link', {
      name: 'About',
    });

    const pokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(pokemon).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const home = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const pokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(pokemon);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/Xablau');

    const notFoundText = screen.getByRole('heading', {
      name: /not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
