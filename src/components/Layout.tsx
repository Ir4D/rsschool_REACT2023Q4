// import { FC, ReactNode, useState } from "react";
// import Heading from "./Heading";

// type layoutProps = {
//   children: ReactNode;
// };

// const Layout:FC<layoutProps> = ({ children }) => {
//   return (
//     <>
//       <Heading />
//       {children}
//     </>
//   );
// };

// export default Layout;


/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { cardsType } from "@/types";
import Spinner from '@/components/Spinner';
import Search from '@/components/Search';

import style from "../styles/CardsList.module.css";

interface LayoutProps {
  cards?: cardsType[],
  children?: ReactNode,
}

const Layout:FC<LayoutProps> = ({ children, cards }: LayoutProps ) => {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const updateData = (value: string) => {
    setTerm(value);
  };

  console.log(cards);

  // useEffect(() => {
  //   setLoading(true);

  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 2000);
  // }, [term, currentPage, itemsPerPage]);

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main>
        <>
          <Search
            page={currentPage} 
            updatePage={setCurrentPage} 
            itemsPerPage={itemsPerPage} 
            setItemsPerPage={setItemsPerPage}
            updateData={updateData}
          />
          <div>
            {loading ? (
              <Spinner />
            ) : (
              <ul className={style.animeList}>
                {cards && cards.length !== 0 ? (
                  cards.map((anime: cardsType) => (
                    <Link href={`details/${anime.mal_id}?term=${term}&itemsPerPage=${itemsPerPage}&page=${currentPage}`} key={anime.mal_id}>
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
                  ))
                ) : (
                  <p>No anime were found</p>
                )}
              </ul>
            )}
          </div>
        </>
      </main>
    </>
  );
};

export default Layout;
