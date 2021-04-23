import Head from 'next/head';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceBar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Body />
    </div>
  )
}
