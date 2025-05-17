import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from 'next-themes';

// Mock next-themes while preserving other exports
const actualThemes = jest.requireActual('next-themes');

jest.mock('next-themes', () => ({
  ...actualThemes,
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      setTheme: jest.fn(),
    }));
  });

  it('renders with correct aria-label', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark theme',
    );
  });

  it('toggles theme on click', () => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      setTheme,
    }));

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light theme on click', () => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'dark',
      setTheme,
    }));

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('handles undefined or system theme by defaulting to light theme', () => {
    const setTheme = jest.fn();

    // Test with undefined theme
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: undefined,
      setTheme,
    }));

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(setTheme).toHaveBeenCalledWith('dark');

    // Test with 'system' theme
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'system',
      setTheme,
    }));

    fireEvent.click(screen.getByRole('button'));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('handles missing theme context gracefully', () => {
    // Mock useTheme to return undefined
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: undefined,
      setTheme: undefined,
    }));

    // Should not throw when rendering or clicking
    expect(() => {
      const { container } = render(<ThemeToggle />);
      fireEvent.click(screen.getByRole('button'));
    }).not.toThrow();
  });

  it('handles rapid successive clicks consistently', () => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      setTheme,
    }));

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Simulate multiple rapid clicks
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Should only call setTheme once with 'dark'
    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('dark');

    // Reset mocks and test from dark to light
    setTheme.mockClear();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'dark',
      setTheme,
    }));

    // Re-render to pick up the new mocked value
    render(<ThemeToggle />);
    const darkButton = screen.getByRole('button');

    fireEvent.click(darkButton);
    fireEvent.click(darkButton);

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
