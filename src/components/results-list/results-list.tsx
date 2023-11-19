/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useGetDataQuery } from '../../services/api-request';
import PaginationPanel from '../pagination-panel/pagination-panel';
import ResultItem from './result-item';
import Spinner from '../spinner/spinner';

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
