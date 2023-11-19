import { Routes, Route, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import MainPage from './components/pages/main-page';
import Details from './components/item-details/item-details';
import toolkitSlice from './reducer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ResultsList from './components/results-list/results-list';
import { apiService } from './services/api-request';
import ResultItem from './components/results-list/result-item';
import toolkitReducer, {
  changeSearchTerm,
  changeResultList,
  changeItemsPerPage,
  changeLoadingMainPage,
  changeLoadingDetailsPage,
} from './reducer';

describe('App', () => {
  test('renders App component', async () => {
    const rootReducer = combineReducers({
      toolkit: toolkitSlice,
      [apiService.reducerPath]: apiService.reducer,
    });

    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/rsschool_REACT2023Q4/" element={<MainPage />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  });
});

describe('MainPage', () => {
  const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    [apiService.reducerPath]: apiService.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });

  test('renders MainPage', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/']}>
          <Routes>
            <Route path="/rsschool_REACT2023Q4/" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Anime List:')).toBeInTheDocument();
  });

  test('updates term when search input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/']}>
          <Routes>
            <Route path="/rsschool_REACT2023Q4/" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText('Type here');
    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    expect(searchInput).toHaveValue('Naruto');
  });
});

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            mal_id: 1,
            title: 'Sample Anime 1',
            year: 2022,
            type: 'TV',
            images: { jpg: { image_url: 'https://example.com/image1.jpg' } },
            image_url: 'https://example.com/image1.jpg',
          },
          {
            mal_id: 2,
            title: 'Sample Anime 2',
            year: 2022,
            type: 'Movie',
            images: { jpg: { image_url: 'https://example.com/image2.jpg' } },
            image_url: 'https://example.com/image2.jpg',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe('Tests for the Card List component:', () => {
  const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    [apiService.reducerPath]: apiService.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/']}>
          <Routes>
            <Route path="/rsschool_REACT2023Q4/" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
    expect(screen.getByText('No anime were found')).toBeInTheDocument();
  });

  test('renders spinner when fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsList page={1} setPage={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });
});

const mockAnime = {
  mal_id: 1,
  title: 'Sample Anime',
  year: 2022,
  type: 'TV',
  images: { jpg: { image_url: 'https://example.com/image.jpg' } },
  image_url: 'https://example.com/image.jpg',
};

test('renders anime item correctly', () => {
  const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    [apiService.reducerPath]: apiService.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ResultItem anime={mockAnime} />
      </MemoryRouter>
    </Provider>
  );

  const animeTitle = screen.getByText('Sample Anime');
  const animeYear = screen.getByText('Year: 2022');
  const animeImage = screen.getByAltText('Anime');

  expect(animeTitle).toBeInTheDocument();
  expect(animeYear).toBeInTheDocument();
  expect(animeImage).toBeInTheDocument();
  expect(animeImage).toHaveAttribute('src', 'https://example.com/image.jpg');
});

test('clicking on anime item sets selected anime', () => {
  const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    [apiService.reducerPath]: apiService.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ResultItem anime={mockAnime} />
      </MemoryRouter>
    </Provider>
  );

  const animeItem = container.querySelector('.anime-item');
  fireEvent.click(animeItem!);
});

describe('Tests for reducer file', () => {
  const initialState = {
    searchTerm: '',
    resultsList: [],
    itemsPerPage: 12,
    loadingMainPage: false,
    loadingDetailsPage: false,
  };

  test('handle changeSearchTerm action', () => {
    const nextState = toolkitReducer(
      initialState,
      changeSearchTerm('New Search Term')
    );
    expect(nextState.searchTerm).toBe('New Search Term');
  });

  test('handle changeResultList action', () => {
    const mockResultList = [{ id: 1, title: 'Sample Anime' }];
    const nextState = toolkitReducer(
      initialState,
      changeResultList(mockResultList)
    );
    expect(nextState.resultsList).toEqual(mockResultList);
  });

  test('handle changeItemsPerPage action', () => {
    const nextState = toolkitReducer(initialState, changeItemsPerPage(24));
    expect(nextState.itemsPerPage).toBe(24);
  });

  test('handle changeLoadingMainPage action', () => {
    const nextState = toolkitReducer(initialState, changeLoadingMainPage(true));
    expect(nextState.loadingMainPage).toBe(true);
  });

  test('handle changeLoadingDetailsPage action', () => {
    const nextState = toolkitReducer(
      initialState,
      changeLoadingDetailsPage(true)
    );
    expect(nextState.loadingDetailsPage).toBe(true);
  });
});
