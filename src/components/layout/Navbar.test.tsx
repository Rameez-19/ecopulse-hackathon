import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders the branding logo', () => {
    render(<Navbar />);
    expect(screen.getByText('EcoPulse')).toBeInTheDocument();
  });

  it('toggles the notification dropdown when the notification button is clicked', () => {
    render(<Navbar />);
    const notifyButton = screen.getByLabelText(/notifications/i);
    
    // Initially hidden
    expect(screen.queryByText(/Let's make an impact/i)).not.toBeInTheDocument();
    
    // Click to show
    fireEvent.click(notifyButton);
    expect(screen.getByText(/Let's make an impact/i)).toBeInTheDocument();
  });

  it('toggles the profile dropdown when the profile button is clicked', () => {
    render(<Navbar />);
    const profileButton = screen.getByLabelText(/user profile/i);
    
    // Initially hidden
    expect(screen.queryByText(/Eco Adventurer/i)).not.toBeInTheDocument();
    
    // Click to show
    fireEvent.click(profileButton);
    expect(screen.getByText(/Eco Adventurer/i)).toBeInTheDocument();
  });
});
