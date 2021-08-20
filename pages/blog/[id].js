import Markdown from "markdown-to-jsx";
import Moment from "react-moment";
// import { fetchAPI } from "../../lib/api";

import Image from "next/image";
// import Seo from "../../components/seo";
import styles from "../../styles/BlogPost.module.css";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";

const Article = ({ article }) => {
  // const seo = {
  //   metaTitle: article.title,
  //   metaDescription: article.description,
  //   shareImage: article.image,
  //   article: true,
  // };

  return (
    <>
      {/* // <Layout>
    //   <Seo seo={seo} slug={article.id} /> */}
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.header__content}>
            <div className={styles.cardProfile}>
              <div className={styles.img2}>
                {/* {article.author.picture && (
                  <Image
                    src={article.author.picture.url}
                    height={50}
                    width={50}
                    className={styles.img2}
                    alt={article.author.name}
                  />
                )} */}
              </div>
              <div className={styles.cardProfileInfo}>
                <h3 className={styles.profileName}>{article.name}</h3>
                <p className={styles.profileDate}>
                  <Moment format="MMM Do YYYY">{article.updated_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.cover__wrapper}>
          <div className={styles.cover__image}>
            <Image
              src={article.image.url}
              height={400}
              width={1000}
              alt={article.image.name}
            />
          </div>
        </div>
        <main className={styles.container__main}>
          <aside className={styles.container__left}></aside>

          <article className={styles.container__middle}>
            <Markdown>{article.desc}</Markdown>
          </article>

          <nav className={styles.container__right}></nav>
        </main>
        <footer>
          <div className={styles.shareContainer}>
            <div>
              <Link
                href={`http://www.facebook.com/sharer.php?u=https://thedalaltimes.com/${article.id}`}
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
                href={`http://twitter.com/share?url=https://thedalaltimes.com/${article.id}`}
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
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://thedalaltimes.com/${article.id}`}
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
                href={`https://telegram.me/share/url?url=https://thedalaltimes.com/${article.id}`}
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
        </footer>
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

  const articles = await res.json();
  if (!articles) {
    return {
      notFound: true,
    };
  }

  return {
    props: { article: articles },
    revalidate: 60 * 10,
  };
}

export default Article;
