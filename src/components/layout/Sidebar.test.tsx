import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar Component', () => {
  it('renders navigation links', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('AI Coach')).toBeInTheDocument();
    expect(screen.getByText('Eco Simulator')).toBeInTheDocument();
  });

  it('renders the Eco Status panel', () => {
    render(<Sidebar />);
    expect(screen.getByText('Eco Status')).toBeInTheDocument();
    expect(screen.getByText('Seedling')).toBeInTheDocument();
  });
});
