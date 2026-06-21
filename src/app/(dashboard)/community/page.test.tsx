import { render, screen } from '@testing-library/react';
import CommunityPage from './page';

describe('Community Page', () => {
  it('renders the header and stats', () => {
    render(<CommunityPage />);
    expect(screen.getByText('Global Impact Community')).toBeInTheDocument();
    expect(screen.getByText(/24,502 Active Eco Warriors/i)).toBeInTheDocument();
  });

  it('renders the activity feed', () => {
    render(<CommunityPage />);
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument();
    expect(screen.getByText("Completed the 'Zero Plastic Week' challenge!")).toBeInTheDocument();
  });

  it('renders the leaderboard', () => {
    render(<CommunityPage />);
    expect(screen.getByText('Global Top 5')).toBeInTheDocument();
    expect(screen.getByText('EcoQueen99')).toBeInTheDocument();
    expect(screen.getByText('You (Seedling)')).toBeInTheDocument();
  });
});
