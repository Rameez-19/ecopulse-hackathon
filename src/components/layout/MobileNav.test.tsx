import { render, screen } from '@testing-library/react';
import { MobileNav } from './MobileNav';

// Mock Next.js usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: () => '/home',
}));

describe('MobileNav Component', () => {
  it('renders all mobile navigation links', () => {
    render(<MobileNav />);
    
    // Check that ARIA labels exist for screen readers
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Coach')).toBeInTheDocument();
    expect(screen.getByLabelText('Simulator')).toBeInTheDocument();
    expect(screen.getByLabelText('Challenges')).toBeInTheDocument();
    expect(screen.getByLabelText('Community')).toBeInTheDocument();
    
    // Check visible text
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Simulator')).toBeInTheDocument();
  });
});
