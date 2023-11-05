/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../services/api-service';
import Spinner from '../spinner/spinner';

const Details = () => {
  const { id } = useParams();
  const [resultItem, setResultItem] = useState(Object);
  const [loading, setLoading] = useState(true);

  const { getItemDetails } = ApiService();

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const newResultItem = await getItemDetails(Number(id));
        setResultItem(newResultItem);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadPageData();
  }, [ApiService, id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="item-details">
        <div>
          <img src={resultItem.img} alt="Anime" className="anime-img" />
          <div className="anime-description">
            <p className="anime-info anime-title">{resultItem.title}</p>
            <p className="anime-info anime-year">Year: {resultItem.year}</p>
            <p className="anime-info anime-type">Type: {resultItem.type}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
