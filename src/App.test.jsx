import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the image aspect ratio tool', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: '画像アスペクト比計算ツール' })).toBeInTheDocument();
});
