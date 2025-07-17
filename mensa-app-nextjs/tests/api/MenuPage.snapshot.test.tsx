import { render, screen } from '@testing-library/react';
import MenuPage from '@/app/menu/page';

// Mock der globalen fetch-Funktion
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { _id: 'dish1', name: 'Test-Gericht', price: '€5.00', description: 'Ein leckerer Test.' }
    ]),
  })
) as jest.Mock;

describe('MenuPage Snapshot Test', () => {
  it('sollte nach dem Laden der Daten mit dem Snapshot übereinstimmen', async () => {
    // Vorbereiten
    const { container } = render(<MenuPage />);

    // Ausführen: Warten, bis die Daten geladen sind
    await screen.findByText('Test-Gericht');

    // Überprüfen
    expect(container).toMatchSnapshot();
  });
});