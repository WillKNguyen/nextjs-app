import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Backpacking Guidebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Backpacking Guidebook
        </h1>


        <div className={styles.grid}>
          <Link href='/areas' className={styles.card}>
            <h3>Destinations &rarr;</h3>
            <p>Places we want to visit</p>
          </Link>
          <Link href='/' className={styles.card}>
            <h3>Gear List &rarr;</h3>
            <p>Checklist for gears to bring</p>
          </Link>
          <Link href='/' className={styles.card}>
            <h3>Food List &rarr;</h3>
            <p>Checklist for food to bring</p>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/WillKNguyen/nextjs-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by
          <img src="/mountain_flag.svg" className={styles.logo} /> 
          <strong className={styles.name}>Will Nguyen</strong>
          <img src="/mountain_flag.svg" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
