/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom';
import { useGetDataDetailsQuery } from '../../services/api-request';
import Spinner from '../spinner/spinner';

const Details = () => {
  const { id } = useParams();

  const { data: dataDetails, isLoading } = useGetDataDetailsQuery({
    id: id,
  });

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && dataDetails && (
        <div
          key={dataDetails.data.mal_id}
          className="item-details"
          data-testid="Anime"
        >
          <div>
            <img
              src={
                dataDetails.data.images
                  ? dataDetails.data.images.jpg.image_url
                  : ''
              }
              alt="Anime"
              className="anime-img"
            />
            <div className="anime-description">
              <p className="anime-info anime-title">{dataDetails.data.title}</p>
              <p className="anime-info anime-title">
                {dataDetails.data.title_japanese}
              </p>
              <p className="anime-info anime-year">
                Year:{' '}
                {dataDetails.data.year ? dataDetails.data.year : 'Unknown'}
              </p>
              <p className="anime-info anime-type">
                Type:{' '}
                {dataDetails.data.type ? dataDetails.data.type : 'Unknown'}
              </p>
              <p className="anime-info anime-type">
                Score:{' '}
                {dataDetails.data.score ? dataDetails.data.score : 'Unknown'}
              </p>
              <p className="anime-info anime-type">
                Rating:{' '}
                {dataDetails.data.rating ? dataDetails.data.rating : 'Unknown'}
              </p>
            </div>
            <Link to="/rsschool_REACT2023Q4/">
              <button className="item-details-btn">Close</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
