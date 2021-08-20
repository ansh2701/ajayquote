import Head from "next/head";
// import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const [items, setItems] = useState(null);
  const [local, setLocal] = useState(null);
  const large = [0, 9, 15, 19, 20];
  const small = [1, 2, 3, 6, 7, 8, 10, 11, 12, 16, 17, 18];

  const checkIndex = (index) => {
    if (large.includes(index)) return "large";
    else if (small.includes(index)) return "small";
    else return "medium";
  };

  useEffect(() => {
    setLocal(JSON.stringify(localStorage.getItem("heart")));
  }, [data]);
  return (
    <div>
      <Head>
        <title>Ajay Gupta</title>
        <meta name="description" content="Quotes by Ajay Gupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <h1>AJAY GUPTA</h1>
        {/* <h1>{homepage.hero.title}</h1> */}
      </div>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.postFeed}>
            {data.map((quote, index) => (
              <Card
                quote={quote}
                key={index}
                blogClass={checkIndex(index)}
                local={local}
              />
            ))}
          </div>
        </div>
      </div>
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
