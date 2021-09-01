import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  FaComment,
  FaEye,
  FaHeart,
  FaRegCommentAlt,
  FaRegEye,
  FaRegHeart,
  FaShare,
} from "react-icons/fa";
import styles from "../styles/CssCard.module.css";

const Card = ({ quote, blogClass, local }) => {
  const [heart, setHeart] = useState(false);
  const [count, setCount] = useState(quote.hearts);
  const handleClick = async () => {
    setCount(count + 1);
    setHeart(true);
    const it = localStorage.getItem("heart");

    localStorage.setItem("heart", it ? [it, quote.id] : [quote.id]);
    const values = { hearts: quote.hearts + 1 };
    const res = await fetch(
      `https://pacific-beyond-38163.herokuapp.com/quotes/${quote.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    if (!res.ok) {
      console.log("went wrong");
    }
  };

  const handleChange = async () => {
    const values = { views: quote.views + 1 };
    console.log(values);
    const res = await fetch(
      `https://pacific-beyond-38163.herokuapp.com/quotes/${quote.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    if (!res.ok) {
      console.log("went wrong");
    }
  };

  let currentDate = new Date(quote.updated_at);
  return (
    <>
      <div className={styles[blogClass]}>
        <div className={styles.card__cover}>
          <div className={styles.image}>
            {quote.image && (
              <Image
                src={quote.image.url}
                layout="fill"
                alt={quote.image.name}
              />
            )}
          </div>
        </div>

        <div className={styles.card__content}>
          <div className={styles.cardProfile}>
            <div className={styles.img2}>
              <Image
                src="/gupta.jpg"
                height={50}
                width={50}
                className={styles.img2}
                alt={quote.name}
              />
            </div>
            <div className={styles.cardProfileInfo}>
              <h3 className={styles.profileName}>{quote.name}</h3>
              <p className={styles.profileDate}>{currentDate.toDateString()}</p>
              {/* <p className={styles.profileDate}>25 June 2021</p> */}
            </div>

            {/* <div className={styles.share}> */}
            <Link href={`/quote/${quote.id}`}>
              <a className={styles.share}>
                <FaShare />
              </a>
            </Link>

            {/* </div> */}
          </div>
          <Link href={`/quote/${quote.id}`}>
            <a onClick={handleChange}>
              <p className={styles.description}>{quote.desc}</p>
              <span className={styles.title}>{quote.category.name}</span>
            </a>
          </Link>
          <div className={styles.icons}>
            <div>
              <FaRegEye />

              <span>{quote.views}</span>

              <FaRegCommentAlt />

              <span>{quote.comments.length}</span>
            </div>
            <div>
              {heart || (local && local.includes(quote.id)) ? (
                <FaHeart color={"red"} />
              ) : (
                <FaRegHeart color={"red"} onClick={handleClick} />
              )}

              <span>{count}</span>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Card;
