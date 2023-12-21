import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('fetches data from the API', async () => {
  render(<App />);
  // Wait for the loading to disappear (indicating data has been fetched)
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  // Verify that there are items rendered
  expect(screen.queryByRole('list')).toBeInTheDocument();
});

test('rendering the list of items', async () => {
  render(<App />);

  // Wait for the loading to disappear (indicating data has been fetched)
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  // Verify that there are items rendered
  expect(screen.queryByRole('list')).toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(200); // Assuming the API returns 200 items
});

test('filtering the list based on the search term entered in the input box', async () => {
  render(<App />);

  // Wait for the loading to disappear (indicating data has been fetched)
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  // Verify that there are items rendered
  expect(screen.queryByRole('list')).toBeInTheDocument();

  // Simulate typing into the search input
  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Search items'), 'delectus');
  });

  // Verify that the input value is updated
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Search items')).toHaveValue('delectus');
  });

  // Wait for the list to be updated after the search
  await waitFor(() => {
    // Verify that at least one item with the text 'delectus' is present in the filtered list
    expect(screen.queryAllByText(/delectus/i).length).toBeGreaterThan(0);
  });
});