// /* eslint-disable @next/next/no-img-element */
// import { FC, useEffect, useState } from 'react';
// import Head from 'next/head'
// import Link from 'next/link';
// import { GetServerSideProps } from 'next';
// import { cardsType } from "@/types";
// import Spinner from '@/components/Spinner';
// import Search from '@/components/Search';

// import style from "../styles/CardsList.module.css";

// type cardsTypesProps = {
//   cards: cardsType[]
// }

// const Home:FC<cardsTypesProps> = ({ cards }) => {
//   const [term, setTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [loading, setLoading] = useState(false);
//   const updateData = (value: string) => {
//     setTerm(value);
//   };

//   useEffect(() => {
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   }, [term, currentPage, itemsPerPage]);

//   return (
//     <>
//       <Head>
//         <title>Anime List</title>
//       </Head>
//       <main>
//         <>
//           <Search
//             page={currentPage} 
//             updatePage={setCurrentPage} 
//             itemsPerPage={itemsPerPage} 
//             setItemsPerPage={setItemsPerPage}
//             updateData={updateData}
//           />
//           <div>
//             {loading ? (
//               <Spinner />
//             ) : (
//               <ul className={style.animeList}>
//                 {cards && cards.length !== 0 ? (
//                   cards.map((anime: cardsType) => (
//                     <Link href={`details/${anime.mal_id}`} key={anime.mal_id}>
//                       <li key={anime.mal_id} className={style.animeItem}>
//                         <img
//                           src={anime.images ? anime.images.jpg.image_url : ''}
//                           alt="Anime"
//                           className={style.animeImg}
//                         />
//                         <div className={style.animeDescription}>
//                           <h3 className={style.animeTitle}>{anime.title}</h3>
//                           <p className={style.animeYear}>
//                             Year: {anime.year ? anime.year : 'Unknown'}
//                           </p>
//                         </div>
//                       </li>
//                     </Link>
//                   ))
//                 ) : (
//                   <p>No anime were found</p>
//                 )}
//               </ul>
//             )}
//           </div>
//         </>
//       </main>
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps<cardsTypesProps> = async (context) => {
//   const term = context.query.search as string || '';
//   const itemsPerPage = context.query.itemsPerPage as string || '12';
//   const page = context.query.page as string || '1'; 

//   const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=${itemsPerPage}&page=${page}`);
//   const data = await responce.json();

//   return {
//     props: {
//       cards: data.data || [],
//     }
//   }
// }

// export default Home;



import Layout from "@/components/Layout";
import { cardsType } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

type cardsTypesProps = {
  cards: cardsType[],
}

const Home = ({cards}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Layout cards={cards}>
      </Layout>
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
      cards: data.data,
    }
  }
}

export default Home;
