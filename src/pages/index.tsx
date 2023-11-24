import CardsList from '@/components/CardsList';
import Head from 'next/head'

const Home = () => (
  <>
    <Head>
      <title>Anime List</title>
    </Head>
    <main>
      <CardsList />
    </main>
  </>
)

export default Home;
