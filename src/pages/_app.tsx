import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MyContextProvider } from '@/components/MyContext';

const App = ({ Component, pageProps }: AppProps) => (
  <MyContextProvider>
    <Component {...pageProps} />
  </MyContextProvider>
);

export default App;
