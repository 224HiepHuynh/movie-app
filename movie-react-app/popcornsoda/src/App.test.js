import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

const mockMovieData = [
  {
    id: "99",
    title: "Fetched Movie",
    poster_path: "/x.jpg",
    release_date: "2025-01-01"
  }
];

// mock fetch before each test
beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockMovieData
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

test("fetches movies when query changes", async () => {
  render(<App />);
  const select = screen.getByRole("combobox");

  // simulate selecting "day"
  fireEvent.change(select, { target: { value: "day" } });

  // wait for the fetched movie to appear in DOM
  expect(await screen.findByText(/Fetched Movie/i)).toBeInTheDocument();
});

