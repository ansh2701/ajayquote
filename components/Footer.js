import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p>Subscribe Form</p>
        <input placeholder="Email Address" />
        <button>Submit</button>
      </div>
      <div className={styles.share}>
        <FaFacebook />
        <FaInstagram />
        <FaLinkedin />
      </div>
      <div className={styles.details}>
        <p>©2021 . All right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
