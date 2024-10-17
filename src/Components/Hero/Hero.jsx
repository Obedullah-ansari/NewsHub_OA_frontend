
import  m1 from "../../assets/m1.jpg";
import  m2 from "../../assets/bg1.jpeg";
import  m3 from "../../assets/cd1.jpg";
import  m5 from "../../assets/m6.jpg";
import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Hero() {
  const variants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  };

  const slidingvariants = {
    animate: {
      y: ['-110%', '0%', '110%'],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const slidingdownvariants = {
    animate: {
      y: ['110%', '0%', '-110%'],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };


  return (
    <>
      <div className={styles.container_ld}>
        <div className={styles.right_ct}>
          <motion.div
            className={styles.upward}
            variants={slidingvariants}
            animate="animate"
          >
            <div className={styles.box}>
              <img src={m1} />
            </div>
            <div className={styles.box}>
              <img src="https://cdn.dribbble.com/users/1894420/screenshots/14081942/social_media_marketing_mobile_phone_concept_1.gif"  />
            </div>
            <div className={styles.box}>
              <img src={m3}  />
            </div>
            <div className={styles.box}>
              <img src="https://www.careerguide.com/career/wp-content/uploads/2021/05/2-17.gif"  />
            </div>
          </motion.div>

          <motion.div
            className={styles.downward}
            variants={slidingdownvariants}
            animate="animate"
          >
            <div className={styles.box}>
              <img src={m5} alt="" />
            </div>
            <div className={styles.box}>
              <img src="https://cdn.dribbble.com/users/285475/screenshots/1240087/breakingnews.gif" alt="" />
            </div>
            <div className={styles.box}>
              <img src="https://cdn.dribbble.com/users/41854/screenshots/3300055/newspaper.gif" alt="" />
            </div>
            <div className={styles.box}>
              <img src="https://i.pinimg.com/originals/c8/58/90/c85890a5a615f9fc65b2738a13c55460.gif" alt="" />
            </div>
          </motion.div>

        </div>

        <div className={styles.left_ct}>
          <motion.div
            className={styles.text_new}
            variants={variants}
            initial="initial"
            animate="animate"
          >
            <motion.h5 variants={variants}>
              Real-Time Updates on Global Events
            </motion.h5>
            <motion.h1
              className={styles.h1m}
              variants={variants}
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                padding: "0.5%",
                color: "#1ABC9C",
              }}
            >
              Your Daily Source of Reliable News
            </motion.h1>
            <motion.h3
              className={styles.h3m}
              variants={variants}
              style={{ fontSize: "2rem", fontWeight: "600", padding: "1%" }}
            >
              Voice of the Indian Youth!
            </motion.h3>
          </motion.div>

          <div className={styles.imgcontainer_new}>
            <img src={m2} alt="" />
          </div>
            <Link  className={styles.btnnew} to="/NewsHub_OA_frontend/topheadlines">
              Read
            </Link>
        </div>
      </div>
    </>
  );
}

export default Hero;
