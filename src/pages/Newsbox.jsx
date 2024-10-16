import Styles from "./pages.module.css";
import {  motion } from "framer-motion";
function Newsbox({ img, text, link,Index, currin}) {
  const shortenedText =
    text.split(" ").splice(0, 15).join(" ") +
    (text.split(" ").length > 15 ? "..." : "");

    const variants = {
      initial: { 
        scale: 1, 
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" // No shadow in the initial state
      },
      animate: { 
        scale: 1.1, 
        boxShadow: "1px 4px 20px 1px #a3e4d7", // Add shadow in the animate state
        transition: { duration: 0.4 }
      },
    };
  

  return (
    <>
      <motion.div
        className={Styles.container}
        variants={variants}
        initial="initial"
        animate={currin === Index ? "animate" : "initial"}
      >
        <div className={Styles.subcontainer}>
          <div className={Styles.imgcont}>
            <img src={img} alt="" className={Styles.newsimg} />
            <a href={link} className={Styles.readbtn}>
              Read more
            </a>
          </div>
          <div className={Styles.textcont}>
            <p>{shortenedText}.</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Newsbox;
