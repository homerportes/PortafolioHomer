import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Projects } from './Projects';

describe('Projects experience', () => {
  it('renders five distinct project worlds, each titled', () => {
    render(<Projects />);

    for (const name of ['Finevo', 'FacEl', 'RealStateApp', 'Artemis Banking', 'LinkUp']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }

    const worlds = document.querySelectorAll('article[data-world]');
    expect(Array.from(worlds, (w) => w.getAttribute('data-world'))).toEqual([
      'finevo',
      'facel',
      'realstate',
      'artemis',
      'linkup',
    ]);
  });

  it('links every project to its real repository', () => {
    render(<Projects />);

    const expected: [RegExp, string][] = [
      [/finevo: frontend repository/i, 'https://github.com/homerportes/FinevoFrontend'],
      [/finevo: backend repository/i, 'https://github.com/homerportes/FinevoApp'],
      [/facel: view repository/i, 'https://github.com/homerportes/FacturacionElectronica'],
      [/realstateapp: view repository/i, 'https://github.com/homerportes/RealStateApps'],
      [/artemis banking: view repository/i, 'https://github.com/homerportes/BankingApp'],
      [/linkup: view repository/i, 'https://github.com/homerportes/DHomerNetwork'],
    ];

    for (const [name, href] of expected) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('uses only real captures, each described for assistive technology', () => {
    render(<Projects />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(20);
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(/^\/work\/[a-z]+\/[a-z0-9-]+\.webp$/);
      expect(image.getAttribute('alt')?.length ?? 0).toBeGreaterThan(10);
    }
  });

  it('names FacEl’s real pipeline stages and states the offline boundary', () => {
    render(<Projects />);

    const pipeline = screen.getByRole('list', { name: /facel fiscal document pipeline/i });
    expect(within(pipeline).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      '01SERIALIZE',
      '02PRE_SIGN_VALIDATE',
      '03SIGN',
      '04FINAL_VALIDATE',
      '05BUILD_EVIDENCE',
    ]);
    expect(screen.getByText(/no live DGII calls/i)).toBeInTheDocument();
  });

  it('marks every scene element with an initial stage state', () => {
    render(<Projects />);

    for (const el of document.querySelectorAll('[data-at]')) {
      const scenes = (el.getAttribute('data-at') ?? '').split(' ').map(Number);
      expect(el.getAttribute('data-state')).toBe(scenes.includes(0) ? 'active' : 'future');
    }
  });
});
