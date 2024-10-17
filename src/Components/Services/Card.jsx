import { motion, useAnimation } from "framer-motion";
import Styles from "./Styles.module.css";
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";


function Card({ title,img, dec  }) {
  const pageflipanimation = useMediaQuery("(max-width:600px)")
  const controls = useAnimation();

  return (
    <motion.div
      className={Styles.card}
      initial={{ rotateY : pageflipanimation ? 150: 0, scale: 1,    boxShadow: " 0.5px 0.5px 8px 1px #76D7C4"}}
      whileHover={{
        scale: 0.9,
        transition: { duration: 0.3, ease: "easeInOut" },
        boxShadow: " 1px 1px 10px 2px #76D7C4",
      }}
      whileInView={{
        rotateY :pageflipanimation ? 0 : 0, 
        transition: { duration: 0.5 },
        
      }}
  
      onHoverStart={() => {
        controls.start({
          scale: 1.1,
          x: 20,
          y: -30,
          boxShadow: "1px 1px 10px 2px #76D7C4",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          scale: 1,
          x: 0,
          y: 0,
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      }}
    >
      <div className={Styles.cardimg}>
        <motion.img
          src={img}
          alt=""
          initial={{ scale: 1 }}
          animate={controls}
        />
      </div>
      <motion.div className={Styles.carddes}>
        
         <h3>{title} </h3>
         
         <p> {dec}  </p>

         <Link to="/NewsHub_OA_frontend/topheadlines"  className={Styles.herobtn} >Read </Link>
      </motion.div>
    </motion.div>
  );
}

export default Card;
