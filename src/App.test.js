import { render, screen } from '@testing-library/react';
import App from './App';

test('renders RedBus heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/RedBus/i);  // looks for "RedBus"
  expect(headingElement).toBeInTheDocument();
});



test('renders login button', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /login/i }); // looks for a button with "Login"
  expect(loginButton).toBeInTheDocument();
});
