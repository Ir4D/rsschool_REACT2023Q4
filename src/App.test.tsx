import { render } from '@testing-library/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/main-page';
import Details from './components/item-details/item-details';
// import ResultsList from './components/results-list/results-list';
// import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
// import ApiService from './services/api-service';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducer from './reducer';
import toolkitSlice from './reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// const apiService = ApiService();

describe('App', () => {
  it('renders App component', async () => {
    // const store = createStore(reducer);

    const rootReducer = combineReducers({
      toolkit: toolkitSlice,
    });

    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/rsschool_REACT2023Q4/"
              element={
                <MainPage
                  updateData={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  resultsList={[]}
                  setResultList={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              }
            >
              <Route path="details/:id" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  });
});

// test('renders ResultsList (CardList)', () => {
//   render(
//     <ResultsList
//       page={0}
//       setPage={function (): void {
//         throw new Error('Function not implemented.');
//       }}
//       itemsPerPage={0}
//       setItemsPerPage={function (): void {
//         throw new Error('Function not implemented.');
//       }}
//     />
//   );
// });

// describe('MainPage', () => {
//   test('renders MainPage', () => {
//     render(
//       <Router>
//         <MainPage
//           term={''}
//           setTerm={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//           updateData={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//           resultsList={[]}
//           setResultList={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//         />
//       </Router>
//     );
//     expect(screen.getByText('Anime List:')).toBeInTheDocument();
//   });

//   test('updates term when search input changes', () => {
//     render(
//       <Router>
//         <MainPage
//           term={''}
//           setTerm={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//           updateData={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//           resultsList={[]}
//           setResultList={function (): void {
//             throw new Error('Function not implemented.');
//           }}
//         />
//       </Router>
//     );
//     const searchInput = screen.getByPlaceholderText('Type here');
//     fireEvent.change(searchInput, { target: { value: 'Naruto' } });
//     expect(searchInput).toHaveValue('Naruto');
//   });
// });

// jest.mock('./services/api-service', () => ({
//   __esModule: true,
//   ...jest.requireActual('./services/api-service'),
//   getItemDetails: jest.fn(),
//   getAllItems: jest.fn(),
// }));

// describe('Tests for the Card List component:', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Check that an appropriate message is displayed if no cards are present', async () => {
//     const mockResults = [
//       {
//         id: 1,
//         title: 'Sample Anime',
//         year: 2022,
//         img: 'sample-image-url',
//       },
//     ];

//     (
//       jest.requireMock('./services/api-service') as {
//         getAllItems: jest.Mock<Promise<unknown>, [number, number]>;
//       }
//     ).getAllItems.mockResolvedValue(mockResults);

//     const contextValues: ContextProps = {
//       term: '',
//       setTerm: jest.fn(),
//       updateData: jest.fn(),
//       resultsList: [],
//       setResultList: jest.fn(),
//     };

//     render(
//       <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/']}>
//         <Context.Provider value={contextValues}>
//           <Routes>
//             <Route
//               path="/rsschool_REACT2023Q4/"
//               element={
//                 <MainPage
//                   term={''}
//                   setTerm={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                   updateData={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                   resultsList={[]}
//                   setResultList={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                 />
//               }
//             />
//           </Routes>
//         </Context.Provider>
//       </MemoryRouter>
//     );

//     expect(screen.getByTestId('spinner')).toBeInTheDocument();

//     await waitFor(() => {
//       expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
//     });
//     expect(screen.getByText('No anime were found')).toBeInTheDocument();
//   });
// });

// describe('tests for Details Component', () => {
//   test('Check that a loading indicator is displayed while fetching data', async () => {
//     const mockResults = [
//       {
//         id: 1,
//         title: 'Sample Anime',
//         year: 2022,
//         img: 'sample-image-url',
//       },
//     ];

//     (
//       jest.requireMock('./services/api-service') as {
//         getItemDetails: jest.Mock<Promise<unknown>, [number, number]>;
//       }
//     ).getItemDetails.mockResolvedValueOnce(mockResults);

//     const contextValues: ContextProps = {
//       term: '',
//       setTerm: jest.fn(),
//       updateData: jest.fn(),
//       resultsList: [],
//       setResultList: jest.fn(),
//     };

//     render(
//       <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/']}>
//         <Context.Provider value={contextValues}>
//           <Routes>
//             <Route
//               path="/rsschool_REACT2023Q4/"
//               element={
//                 <MainPage
//                   term={''}
//                   setTerm={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                   updateData={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                   resultsList={[]}
//                   setResultList={function (): void {
//                     throw new Error('Function not implemented.');
//                   }}
//                 />
//               }
//             />
//           </Routes>
//         </Context.Provider>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.queryByTestId('spinner')).toBeNull();
//     });
//   });
// });

// describe('Details Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders details', async () => {
//     const mockGetItemDetails = jest.spyOn(apiService, 'getItemDetails');
//     mockGetItemDetails.mockResolvedValue({
//       id: 1,
//       title: 'Sample Anime',
//       titleJp: 'Sample Japanese Title',
//       year: 2022,
//       type: 'TV',
//       score: 8.5,
//       rating: 'PG-13',
//       img: 'sample-image-url',
//     });

//     render(
//       <MemoryRouter initialEntries={['/rsschool_REACT2023Q4/details/1']}>
//         <Routes>
//           <Route
//             path="/rsschool_REACT2023Q4/details/:id"
//             element={<Details />}
//           />
//         </Routes>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.queryByTestId('spinner')).toBeNull();
//     });

//     expect(screen.getByText('Close')).toBeInTheDocument();
//   });
// });
