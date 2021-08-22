import Image from "next/image";
import Moment from "react-moment";
import { FaReply, FaThumbsUp } from "react-icons/fa";
import styles from "../styles/Comment.module.css";
import { useState } from "react";

const Comment = ({ comments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Comments</h3>
        <span>{comments.length} comments</span>
      </div>
      <Write rep={true} id={comments[0].quote} />

      {comments.map((c, index) => (
        <div className={styles.box} key={index}>
          <Box c={c} rep={true} />
          {c.reply.map((r, index) => (
            <div key={index} className={styles.reply}>
              <Box c={r} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Comment;

const Box = ({ c, rep = false }) => {
  const [write, setWrite] = useState(false);
  const handleClick = () => {
    setWrite(!write);
  };

  return (
    <>
      <div className={styles.comment}>
        <div className={styles.avatar}>
          <div className={styles.img2}>
            <Image
              src={rep ? "/face2.jpg" : "/face3.jpg"}
              height={50}
              width={50}
              className={styles.img2}
              alt="avatar"
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.profile}>
            <h3 className={styles.profileName}>{c.name}</h3>
            <p className={styles.profileDate}>
              <Moment format="MMM Do YYYY">{c.updated_at}</Moment>
            </p>
          </div>
          <div className={styles.text}>
            {rep ? <span>{c.comment}</span> : <span>{c.reply}</span>}
          </div>
          {rep && (
            <div className={styles.icons}>
              <div>
                <FaThumbsUp />
                <span>{c.likes}</span>
              </div>
              <div onClick={handleClick}>
                <FaReply />
                <span>reply</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {write && <Write />}
    </>
  );
};

const Write = ({ rep = false, id }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const values = {
      name: name,
      comment: text,
      quote: id,
    };
    const res = await fetch(
      `https://pacific-beyond-38163.herokuapp.com/comments`,
      {
        method: "POST",
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

  return (
    <div className={styles.write}>
      <div className={styles.avatar}>
        <div className={styles.img2}>
          <Image
            src="/face1.jpg"
            height={50}
            width={50}
            className={styles.img2}
            alt="avatar"
          />
        </div>
      </div>

      <div className={styles.text}>
        <input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          name={rep ? "comment" : "reply"}
          placeholder={rep ? "Write a comment" : "Write your reply"}
        />
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
