/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import SearchPanel from '@/components/SearchPanel';
import { cardsType } from "@/types";

import style from "../styles/CardsList.module.css";
import PaginationPanel from '@/components/PaginationPanel';

type cardsTypesProps = {
  cards: cardsType[]
}

const Home:FC<cardsTypesProps> = ({ cards }) => {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const updateData = (value: string) => {
    console.log('Update Data:', value);
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
          <PaginationPanel page={currentPage} updatePage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}  />
          <div>  
            {cards && cards.length !== 0 ? (
              <ul className={style.animeList}>
                {cards && cards.map((anime: cardsType) => (
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

export const getServerSideProps: GetServerSideProps<cardsTypesProps> = async (context) => {
  const term = context.query.search as string || '';
  const itemsPerPage = context.query.itemsPerPage as string || '12';
  const page = context.query.page as string || '1'; 

  const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
  const data = await responce.json();

  return {
    props: {
      cards: data.data || [],
    }
  }
}

export default Home;
