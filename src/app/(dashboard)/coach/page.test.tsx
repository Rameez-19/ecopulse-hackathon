import { render, screen } from '@testing-library/react';
import AICoachPage from './page';

describe('AI Coach Page', () => {
  it('renders the header and description', () => {
    render(<AICoachPage />);
    expect(screen.getByText('AI Sustainability Coach')).toBeInTheDocument();
    expect(screen.getByText(/Get personalized, intelligent recommendations/i)).toBeInTheDocument();
  });

  it('renders the fallback profile summary before local storage loads', () => {
    render(<AICoachPage />);
    expect(screen.getByText('Your Life, Your Impact')).toBeInTheDocument();
    // Default fallback state
    expect(screen.getByText(/25km/i)).toBeInTheDocument();
    expect(screen.getByText(/meat heavy/i)).toBeInTheDocument();
  });

  it('renders the action button', () => {
    render(<AICoachPage />);
    expect(screen.getByRole('button', { name: /Discover Your Potential/i })).toBeInTheDocument();
  });
});
