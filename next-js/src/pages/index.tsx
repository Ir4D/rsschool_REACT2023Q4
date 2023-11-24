import Head from 'next/head'
import SearchPanel from '../components/SearchPanel'

export default function Home() {
  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <main>
        <SearchPanel />
      </main>
    </>
  )
}
