/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useGetDataQuery } from '../../services/api-request';
import PaginationPanel from '../pagination-panel/pagination-panel';
import ResultItem from './result-item';
import Spinner from '../spinner/spinner';

import './results-list.css';
import { changeLoadingMainPage } from '../../reducer';
import { useEffect } from 'react';

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
  const searchTerm = useSelector(
    (state: unknown) =>
      (state as { toolkit: { searchTerm: string } }).toolkit.searchTerm
  );

  const itemsPerPage = useSelector(
    (state: unknown) =>
      (state as { toolkit: { itemsPerPage: number } }).toolkit.itemsPerPage
  );

  const { data: dataAll, isFetching } = useGetDataQuery({
    searchTerm: searchTerm,
    limit: itemsPerPage,
    page: page,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeLoadingMainPage(isFetching));
  }, [dispatch, dataAll, isFetching]);

  return (
    <>
      {isFetching && <Spinner />}
      {!isFetching && (
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
      )}
    </>
  );
};

export default ResultsList;
