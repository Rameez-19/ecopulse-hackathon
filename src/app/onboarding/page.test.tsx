import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingPage from './page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Onboarding Page', () => {
  it('renders step 1 initially', () => {
    render(<OnboardingPage />);
    expect(screen.getByText('Calculate Your Footprint')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Transport' })).toBeInTheDocument();
    expect(screen.getByText('How do you primarily get around?')).toBeInTheDocument();
  });

  it('allows navigation to next step', () => {
    render(<OnboardingPage />);
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);
    
    // Should now be on Step 2
    expect(screen.getByText('Home Energy')).toBeInTheDocument();
    expect(screen.getByText('What best describes your living space?')).toBeInTheDocument();
  });
});
