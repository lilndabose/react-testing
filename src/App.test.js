import { queryByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("Default test",()=>{
  render(<App />)

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
})