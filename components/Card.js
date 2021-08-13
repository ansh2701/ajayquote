import { useState } from "react";
import { FaHeart, FaQuoteLeft, FaRegHeart } from "react-icons/fa";

const Card = ({ data, item }) => {
  const [heart, setHeart] = useState(
    item && item.includes(data.id) ? true : false
  );

  const [count, setCount] = useState(data.hearts);

  const handleClick = async () => {
    setCount(count + 1);
    setHeart(true);
    const it = localStorage.getItem("heart");
    console.log(it);
    localStorage.setItem("heart", it ? [it, data.id] : [data.id]);
    const values = { hearts: data.hearts + 1 };
    const res = await fetch(
      `https://pacific-beyond-38163.herokuapp.com/quotes/${data.id}`,
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

  return (
    <div>
      <div className="box">
        {/* <i className="fas fa-quote-left quote"></i> */}
        <FaQuoteLeft className="quote" />
        <p>{data.quote}</p>
        <div className="content">
          <div className="info">
            <div className="name">{data.name}</div>
            <div className="job">{data.category.name}</div>
            <div className="heart">
              {heart ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart
                  onClick={heart || handleClick}
                  style={{ color: "red" }}
                />
              )}
            </div>
            <span>{count}</span>
          </div>
          {/* <div className="image">
            <img src="images/profile-1.jpeg" alt="" />
          </div> */}
        </div>
      </div>
      <style jsx>{`
        .box {
          background: #fff;
          width: 300px;
          padding: 25px;
          border-radius: 3px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }
        .box .quote {
          font-size: 20px;
          color: #17a2b8;
        }
        .box .content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
        }
        .box .info .name {
          font-weight: 600;
          font-size: 17px;
        }
        .box .info .job {
          font-size: 16px;
          font-weight: 500;
          color: #17a2b8;
        }
        .box .info .heart {
          margin-top: 3px;
        }

        @media (max-width: 1045px) {
          .box {
            width: calc(50% - 10px);
            margin: 10px 0;
          }
        }
        @media (max-width: 702px) {
          .box {
            width: 90vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
