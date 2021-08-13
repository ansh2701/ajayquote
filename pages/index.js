import Head from "next/head";
// import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    setItems(JSON.stringify(localStorage.getItem("heart")));
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Ajay Gupta</title>
        <meta name="description" content="Quotes by Ajay Gupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Ajay Gupta</h1>
      </header>
      <main className={styles.main}>
        {data.map((quote, index) => (
          <Card key={index} data={quote} item={items} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://pacific-beyond-38163.herokuapp.com/quotes?verified=true`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 60,
  };
}
