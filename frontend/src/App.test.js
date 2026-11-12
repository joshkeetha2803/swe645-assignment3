// Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
// Course: SWE 645
// Purpose: It contains basic unit tests for the main App component to ensure successful rendering.

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
