import Markdown from "markdown-to-jsx";
import { useState } from "react";
import Moment from "react-moment";
import {
  FaComment,
  FaEye,
  FaHeart,
  FaQuoteLeft,
  FaRegHeart,
  FaShare,
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaRegEye,
  FaRegCommentAlt,
} from "react-icons/fa";
// import { fetchAPI } from "../../lib/api";

import Image from "next/image";
// import Seo from "../../components/seo";
import styles from "../../styles/BlogPost.module.css";
import Link from "next/link";
import Comment from "../../components/Comment";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Quote = ({ quote }) => {
  // const [heart, setHeart] = useState(false);
  const [count, setCount] = useState(quote.hearts);
  // const handleClick = async () => {
  //   setCount(count + 1);
  //   setHeart(true);
  //   const it = localStorage.getItem("heart");

  //   localStorage.setItem("heart", it ? [it, quote.id] : [quote.id]);
  //   const values = { hearts: quote.hearts + 1 };
  //   const res = await fetch(
  //     `https://pacific-beyond-38163.herokuapp.com/quotes/${quote.id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     }
  //   );
  //   if (!res.ok) {
  //     console.log("went wrong");
  //   }
  // };
  // const seo = {
  //   metaTitle: quote.title,
  //   metaDescription: quote.description,
  //   shareImage: quote.image,
  //   quote: true,
  // };

  return (
    <>
      {/* // <Layout>
    //   <Seo seo={seo} slug={quote.id} /> */}
      <div className={styles.container}>
        <Header />
        <main className={styles.container__main}>
          <article className={styles.container__middle}>
            <div className={styles.cardProfile}>
              <div className={styles.img2}>
                <Image
                  src="/gupta.jpg"
                  height={30}
                  width={30}
                  className={styles.img2}
                  alt="ajay"
                />
              </div>
              <div className={styles.cardProfileInfo}>
                <h3 className={styles.profileName}>{quote.name} · </h3>

                <p className={styles.profileDate}>
                  <Moment format="MMM Do YYYY">{quote.updated_at}</Moment>
                </p>
              </div>
            </div>

            <Markdown>{quote.desc}</Markdown>

            <div className={styles.cover__wrapper}>
              <div className={styles.cover__image}>
                <Image
                  src={quote.image.url}
                  height={400}
                  width={1000}
                  alt={quote.image.name}
                />
              </div>
            </div>
            <div className={styles.icons}>
              <div>
                <FaRegEye />

                <span>{quote.views}</span>

                <FaRegCommentAlt />

                <span>{quote.comments.length}</span>
              </div>
              <div>
                {/* {heart || (local && local.includes(quote.id)) ? (
                <FaHeart color={"red"} />
              ) : (
                <FaRegHeart color={"red"} onClick={handleClick} />
              )} */}
                <FaHeart color={"red"} />
                <span>{count}</span>
              </div>
            </div>
          </article>
        </main>
        <footer>
          <div className={styles.shareContainer}>
            <div>
              <Link
                href={`http://www.facebook.com/sharer.php?u=https://ajaygupta.netlify.app/${quote.id}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBox}
                >
                  <FaFacebook size={30} />
                </a>
              </Link>
              <Link
                href={`http://twitter.com/share?url=https://ajaygupta.netlify.app/${quote.id}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBox}
                >
                  <FaTwitter size={30} />
                </a>
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ajaygupta.netlify.app/${quote.id}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBox}
                >
                  <FaLinkedin size={30} />
                </a>
              </Link>
              <Link
                href={`https://telegram.me/share/url?url=https://ajaygupta.netlify.app/${quote.id}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBox}
                >
                  <FaTelegram size={30} />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.comments}>
            <Comment comments={quote.comments} />
          </div>
        </footer>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://pacific-beyond-38163.herokuapp.com/quotes");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://pacific-beyond-38163.herokuapp.com/quotes/${params.id}`
  );

  const quotes = await res.json();
  if (!quotes) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quote: quotes },
    revalidate: 60 * 10,
  };
}

export default Quote;
