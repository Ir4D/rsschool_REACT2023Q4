import { fireEvent, render, screen } from '@testing-library/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/main-page';
import Details from './components/item-details/item-details';
import ResultsList from './components/results-list/results-list';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// test("renders App", async () => {
//   // render(
//   //   <Router location={''} navigator={undefined as unknown as Navigator}>
//   //     <App />
//   //   </Router>
//   // );

//   // await waitFor(() => {
//   //   const headings = screen.findAllByRole('heading', { level: 3 });
//   //   expect(headings).toHaveLength(12);
//   // });
// });

describe('App', () => {
  it('renders App component', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/rsschool_REACT2023Q4/" element={<MainPage />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    // await screen.getByText("Anime List:");
  });
});

test('renders ResultsList (CardList)', () => {
  render(
    <ResultsList
      page={0}
      setPage={function (): void {
        throw new Error('Function not implemented.');
      }}
      itemsPerPage={0}
      setItemsPerPage={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
});

describe('MainPage', () => {
  test('renders MainPage', () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );
    expect(screen.getByText('Anime List:')).toBeInTheDocument();
  });

  test('updates term when search input changes', () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText('Type here');
    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    expect(searchInput).toHaveValue('Naruto');
  });
});
