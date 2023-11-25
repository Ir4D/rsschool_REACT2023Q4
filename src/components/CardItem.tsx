/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react';
import Link from 'next/link';

import style from "../styles/CardsList.module.css";

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

const CardItem: FC<ResultItemProps> = ({ anime }) => {
  const [, setSelectedAnime] = useState<AnimeItem | null>(null);

  const handleAnimeClick = () => {
    setSelectedAnime(anime);
  };

  return (
    // <div key={anime.mal_id}>
      <Link
        href={`details/${anime.mal_id}`}
        key={anime.mal_id}
      >
        <li className={style.animeItem} onClick={() => handleAnimeClick()}>
          <img
            src={anime.images ? anime.images.jpg.image_url : ''}
            alt="Anime"
            className={style.animeImg}
          />
          <div className={style.animeDescription}>
            <h3 className={style.animeTitle}>{anime.title}</h3>
            <p className={style.animeYear}>
              Year: {anime.year ? anime.year : 'Unknown'}
            </p>
          </div>
        </li>
      </Link>
    // </div>
  );
};

export default CardItem;
