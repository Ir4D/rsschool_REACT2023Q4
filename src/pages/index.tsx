import CardsList from '@/components/CardsList';
import Head from 'next/head'
import { useState } from 'react';

const Home = () => {
  const [term, setTerm] = useState('');

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main>
        <CardsList term={term} />
      </main>
    </>
  );
};

export default Home;
