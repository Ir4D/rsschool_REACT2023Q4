import CardsList from '@/components/CardsList';
import SearchPanel from '@/components/SearchPanel';
import Head from 'next/head'
import { useState } from 'react';

const Home = () => {
  const [term, setTerm] = useState('');
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
        <CardsList term={term} />
      </main>
    </>
  );
};

export default Home;
