import { useState } from 'react';
import Head from 'next/head'
import CardsList from '@/components/CardsList';
import SearchPanel from '@/components/SearchPanel';

const Home = () => {
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
        <CardsList
          term={term}
          page={currentPage}
          setPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </main>
    </>
  );
};

export default Home;
