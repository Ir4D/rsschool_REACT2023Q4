import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import './results-list.css';

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
}

interface ResultItemProps {
  anime: AnimeItem;
}

const ResultItem: FC<ResultItemProps> = ({ anime }) => {
  const [, setSelectedAnime] = useState<AnimeItem | null>(null);

  const handleAnimeClick = () => {
    setSelectedAnime(anime);
  };

  return (
    <div key={anime.mal_id}>
      <Link
        to={`/rsschool_REACT2023Q4/details/${anime.mal_id}`}
        key={anime.mal_id}
      >
        <li className="anime-item" onClick={() => handleAnimeClick()}>
          <img
            src={anime.images ? anime.images.jpg.image_url : ''}
            alt="Anime"
            className="anime-img"
          />
          <div className="anime-description">
            <h3 className="anime-info anime-title">{anime.title}</h3>
            <p className="anime-info anime-year">
              Year: {anime.year ? anime.year : 'Unknown'}
            </p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default ResultItem;
