/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { cardsType } from "@/types";
import Spinner from '@/components/Spinner';
import Search from '@/components/Search';
import { useMyContext } from './MyContext';

import style from "../styles/CardsList.module.css";
import { useRouter } from 'next/router';

interface LayoutProps {
  cards?: cardsType[],
  children?: ReactNode,
}

const Layout:FC<LayoutProps> = ({ children, cards }: LayoutProps ) => {
  const [loading, setLoading] = useState(false);
  const { term, itemsPerPage, currentPage } = useMyContext();

  const router = useRouter();

  const goToMainPage = () => {
    if (router.pathname.includes('/details')) {
      router.push(`/?search=${term}&itemsPerPage=${itemsPerPage}&page=${currentPage}`);
      return null;
    }
  };

  const isMainPage = router.pathname.indexOf('/details') === -1;

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main id="main" >
        <div className={style.appWrapper}>
          <div
            id="appMain" 
            className={`${style.appMain} ${isMainPage ? 'active' : 'unactive'}`}
            onClick={goToMainPage}>
            <Search />
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
