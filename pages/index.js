import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function AppEntry() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-solid border-4">
        <Link href="home">
          <span className="cursor-pointer bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg">Home</span>
        </Link>
        <Link href="abouts">
          <span type="button" className="cursor-pointer bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg">Abouts</span>
        </Link>
        <Link href="helps">
          <span type="button" className="cursor-pointer bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg">Helps</span>
        </Link>
      </div>
    </div>
  );
}
