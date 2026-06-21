import { render, screen, fireEvent } from '@testing-library/react';
import ChallengesPage from './page';

describe('Challenges Page', () => {
  it('renders the header and tabs', () => {
    render(<ChallengesPage />);
    expect(screen.getByText('Challenges & Rewards')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Active Challenges/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /My Badges/i })).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    render(<ChallengesPage />);
    
    // Initially shows challenges
    expect(screen.getByText('Public Transport Pioneer')).toBeInTheDocument();
    expect(screen.queryByText('Tree Hugger')).not.toBeInTheDocument();

    // Click Badges tab
    fireEvent.click(screen.getByRole('button', { name: /My Badges/i }));
    
    // Should now show badges
    expect(screen.getByText('Tree Hugger')).toBeInTheDocument();
    expect(screen.queryByText('Public Transport Pioneer')).not.toBeInTheDocument();
  });
});
