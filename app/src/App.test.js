import { render, screen } from '@testing-library/react';
import App from './App';

describe("App test suit",()=>{

  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Employee database app/i);
    expect(linkElement).toBeInTheDocument();
  });

})
