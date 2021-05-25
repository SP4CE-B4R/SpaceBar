import Head from 'next/head';
import '../styles/globals.css';
import { UserContext } from '../lib/context';

import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
  	<UserContext.Provider value={userData}>
      <Head>
        <title>SpaceBar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  	<Component {...pageProps} />
  	</UserContext.Provider>
  )
}

export default MyApp
