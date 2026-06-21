import { render, screen } from '@testing-library/react';
import SimulatorPage from './page';

describe('Simulator Page', () => {
  it('renders the header and description', () => {
    render(<SimulatorPage />);
    expect(screen.getByText('Eco Future Simulator')).toBeInTheDocument();
    expect(screen.getByText(/Ask "What if\?" and let AI predict/i)).toBeInTheDocument();
  });

  it('renders the custom scenario input and run button', () => {
    render(<SimulatorPage />);
    expect(screen.getByPlaceholderText(/E.g., What if I stop eating beef/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Simulation/i })).toBeInTheDocument();
  });

  it('renders predefined scenarios', () => {
    render(<SimulatorPage />);
    expect(screen.getByText('What if I switch to a 100% plant-based diet?')).toBeInTheDocument();
  });
});
