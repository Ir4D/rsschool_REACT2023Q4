/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import SearchPanel from '@/components/SearchPanel';

import style from "../styles/CardsList.module.css";
import { GetServerSideProps } from 'next';

interface AnimeItem {
  mal_id: number;
  title: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
}

type cardsType = {
  mal_id: number;
  title: string;
  title_japanese: string;
  year: number;
  type: string;
  score: string;
  rating: string;
  images: { jpg: { image_url: string } };
  image_url: string;
}

type cardsTypesProps = {
  cards: cardsType[]
}

const Home:FC<cardsTypesProps> = ({ cards }) => {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const updateData = (value: string) => {
    setTerm(value);
  };

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main>
        <SearchPanel updateData={updateData} />
            <>
              <div>  
                {cards && cards.length !== 0 ? (
                  <ul className={style.animeList}>
                    {cards && cards.map((anime: AnimeItem) => (
                      <Link
                        href={`details/${anime.mal_id}`}
                        key={anime.mal_id}
                      >
                        <li key={anime.mal_id} className={style.animeItem}>
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
                    ))}
                </ul>
                ) : (
                <p>No anime were found</p>
                )}
              </div>
            </>
      </main>
    </>
  );
};

type cardDetailsType = {
  mal_id: number;
  title: string;
  title_japanese: string;
  year: number;
  type: string;
  score: string;
  rating: string;
  images: { jpg: { image_url: string } };
  image_url: string;
}

type cardDetailsTypesProps = {
  cardDetails: cardDetailsType,
}

// export async function getServerSideProps() {
export const getServerSideProps: GetServerSideProps = async () => {
  const term = '';
  const itemsPerPage = 12;
  const page = 1;

  const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
  const data = await responce.json();

  return {
    props: {
      cards: data.data
    }
  }
}

export default Home;
