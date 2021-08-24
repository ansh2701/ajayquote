import Head from "next/head";
// import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

export default function Home({ data }) {
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
        <title>Quotes | Ajay Gupta</title>
        <meta name="description" content="Quotes by Ajay Gupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <div className={styles.hero}>
        <h3>Ajay Gupta</h3>
        <p>Finding Balance of the Life </p>
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
      <div className={styles.contact}>
        <h2>About</h2>
        <p>Ajay Gupta</p>
        <p>gupta.ajay000006@gmail.com</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero
          dolores et est iusto sed voluptatum, voluptatem itaque minima quae.
        </p>
      </div>
      <Footer />
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
