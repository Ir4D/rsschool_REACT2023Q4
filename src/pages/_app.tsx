import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { MyContextProvider } from '@/components/MyContext';

const App = ({ Component, pageProps }: AppProps) => (
  <MyContextProvider>
    <Component {...pageProps} />
  </MyContextProvider>
);

export default App;
