import '../styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="NextJS Events App" />
      </Head>
      <Component {...pageProps} />
  </Layout>
  );
}

export default App;
