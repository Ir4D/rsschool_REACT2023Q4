// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Spinner from '../spinner/spinner';
// import PaginationPanel from '../pagination-panel/pagination-panel';
// import { changeResultList, changeItemsOnPage } from '../../reducer';
// import { useGetDataQuery } from '../../services/apiRequest';

// import './results-list.css';

// type Anime = {
//   id: number;
//   title: string;
//   year: number;
//   img: string;
// };

// interface AnimeItem {
//   mal_id: number;
//   title: string;
//   year: number;
//   type: string;
//   images?: { jpg: { image_url: string } };
//   image_url: string;
// }

// interface ApiResponse {
//   data: AnimeItem[];
// }

// type ResultsListProps = {
//   page: number;
//   setPage: (page: number) => void;
// };

// const ResultsList: React.FC<ResultsListProps> = ({ page, setPage }) => {
//   const term = useSelector(
//     (state: unknown) => (state as { toolkit: { term: string } }).toolkit.term
//   );

//   const resultsList = useSelector(
//     (state: unknown) =>
//       (state as { toolkit: { resultsList: Anime[] } }).toolkit.resultsList
//   );

//   const itemsPerPage = useSelector(
//     (state: unknown) =>
//       (state as { toolkit: { itemsPerPage: number } }).toolkit.itemsPerPage
//   );

//   const [loading, setLoading] = useState(true);
//   const [, setSelectedAnime] = useState<Anime | null>(null);

//   const dispatch = useDispatch();

//   const { data: dataAll, error, isLoading, refetch } = useGetDataQuery<ApiResponse>({
//     term: term,
//     limit: itemsPerPage,
//     page: page,
//   });

//   console.log('isLoading:', isLoading);

//   const getItems = () => {
//     const animeItems: AnimeItem[] = dataAll?.data || [];
//     return animeItems.map((elem) => ({
//       id: elem.mal_id,
//       title: elem.title,
//       year: elem.year ? elem.year : 'Unknown',
//       img: elem.images ? elem.images.jpg.image_url : '',
//     }));
//   };

//   const loadPageData = async () => {
//     console.log('Loading data...');
//     try {
//       const newResultsList = await getItems();
//       await dispatch(changeResultList(newResultsList));
//       dispatch(changeItemsOnPage());
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isLoading) {
//       setLoading(true);
//       loadPageData();
//     }
//     // loadPageData();
//     console.log('useEffect');
//   }, [term, isLoading, itemsPerPage, page]);

//   const handleAnimeClick = (anime: Anime) => {
//     setSelectedAnime(anime);
//   };

//   function renderAnime(arr: Anime[]) {
//     console.log('renderAnime');
//     console.log('arr:', arr);
//     if (!Array.isArray(arr) || arr.length === 0) {
//       return <p>No anime were found</p>;
//     }

//     const animeList = arr.map((anime) => (
//       <Link
//         to={`/rsschool_REACT2023Q4/details/${anime.id}`}
//         key={anime.id}
//         onClick={() => handleAnimeClick(anime)}
//       >
//         <li className="anime-item" onClick={() => handleAnimeClick(anime)}>
//           <img src={anime.img} alt="Anime" className="anime-img" />
//           <div className="anime-description">
//             <h3 className="anime-info anime-title">{anime.title}</h3>
//             <p className="anime-info anime-year">Year: {anime.year}</p>
//           </div>
//         </li>
//       </Link>
//     ));

//     return <ul className="anime-list">{animeList}</ul>;
//   }

//   return (
//     <>
//       {/* {loading && <Spinner />} */}
//       {isLoading && <Spinner />}
//       {(
//         <>
//           <PaginationPanel page={page} updatePage={setPage} />
//           <div className="results-panel">{renderAnime(resultsList)}</div>
//         </>
//       )}
//       {/* {!loading && dataAll ? (
//         <>
//           <PaginationPanel page={page} updatePage={setPage} />
//           <div className="results-panel">{renderAnime(resultsList)}</div>
//         </>
//       ) : (
//         <Spinner />
//       )} */}
//     </>
//   );
// };

// export default ResultsList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import PaginationPanel from '../pagination-panel/pagination-panel';
import { useGetDataQuery } from '../../services/apiRequest';
import ResultItem from './result-item';

import './results-list.css';

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
}

type ResultsListProps = {
  page: number;
  setPage: (page: number) => void;
};

const ResultsList: React.FC<ResultsListProps> = ({ page, setPage }) => {
  const term = useSelector(
    (state: unknown) => (state as { toolkit: { term: string } }).toolkit.term
  );

  const itemsPerPage = useSelector(
    (state: unknown) =>
      (state as { toolkit: { itemsPerPage: number } }).toolkit.itemsPerPage
  );

  const { data: dataAll, isLoading } = useGetDataQuery({
    term: term,
    limit: itemsPerPage,
    page: page,
  });

  return (
    <>
      {isLoading && <Spinner />}
      {
        <>
          <PaginationPanel page={page} updatePage={setPage} />
          <div className="results-panel">
            {dataAll && dataAll.data.length !== 0 ? (
              <ul className="anime-list">
                {dataAll.data.map((anime: AnimeItem) => (
                  <ResultItem key={anime.mal_id} anime={anime} />
                ))}
              </ul>
            ) : (
              <p>No anime were found</p>
            )}
          </div>
        </>
      }
    </>
  );
};

export default ResultsList;
