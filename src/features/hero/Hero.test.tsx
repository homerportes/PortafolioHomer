import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('presents the portfolio identity and primary actions in English', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: /homer portes/i })).toBeInTheDocument();
    expect(screen.getByText(/portfolio 2026/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      'mailto:homerportes@gmail.com',
    );
  });

  it('states plain facts taken from the profile and experience', () => {
    render(<Hero />);

    expect(screen.getByText('Currently')).toBeInTheDocument();
    expect(screen.getByText(/semi-senior software developer, intelca srl/i)).toBeInTheDocument();
    expect(screen.getByText(/artificial intelligence · data science/i)).toBeInTheDocument();
  });

  it('opens onto the five project worlds, each linking to its chapter', () => {
    render(<Hero />);

    expect(screen.getByText(/five worlds/i)).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: /^project chapters$/i });
    expect(within(nav).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '#project-finevo',
      '#project-facel',
      '#project-realstate',
      '#project-artemis',
      '#project-linkup',
    ]);
  });
});
