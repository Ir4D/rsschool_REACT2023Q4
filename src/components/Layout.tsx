/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { cardsType } from "@/types";
import Spinner from '@/components/Spinner';
import Search from '@/components/Search';

import style from "../styles/CardsList.module.css";
// import { Context } from '@/pages';
import { useMyContext } from './MyContext';

interface LayoutProps {
  cards?: cardsType[],
  children?: ReactNode,
}

// export type ContextProps = {
//   term: string;
//   setTerm: (value: string) => void;
//   updateData: (value: string) => void;
//   updatePage: (value: number) => void;
//   itemsPerPage: number;
//   currentPage: number;
//   resultsList: never[];
//   setResultList: (value: []) => void;
//   children?: React.ReactNode;
// };

// export const Context = createContext<ContextProps>({
//   term: '',
//   setTerm: () => {},
//   updateData: () => {},
//   updatePage: () => {},
//   itemsPerPage: 12,
//   currentPage: 1,
//   resultsList: [],
//   setResultList: () => {},
// });

const Layout:FC<LayoutProps> = ({ children, cards }: LayoutProps ) => {
  // const [term, setTerm] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [resultsList, setResultList] = useState([]);

  const { term, setTerm, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, updateData, updatePage } = useMyContext();

  // const updateData = (value: string) => {
  //   setTerm(value);
  // };

  // const updatePage = (value: number) => {
  //   setCurrentPage(value);
  // };

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main>
        <>
          <Search
            // page={currentPage} 
            // updatePage={setCurrentPage} 
            // itemsPerPage={itemsPerPage} 
            // setItemsPerPage={setItemsPerPage}
            // updateData={updateData}
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
