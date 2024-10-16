import Styles from "./Styles.module.css";
import { motion } from "framer-motion";
import Card from "./Card";
import { services } from "./data.js";
import { useMediaQuery } from "@react-hook/media-query";
import { useState } from "react";
import nextimg from "../../assets/next.png";

function Services() {
  const matches = useMediaQuery("(min-width:600px)");
  const [next, setNext] = useState(1);
  function handelnext() {
    const temp = next;
    if (temp === 3) return;
    else setNext((prev) => prev + 1);
  }
  function handelprev() {
    const temp = next;
    if (temp == 1) return;
    else setNext((prev) => prev - 1);
  }

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.textcontainer}>
          <h1>
            <span style={{ color: "#37a3d6" }}>Our</span> services
          </h1>
          <motion.span
            className={Styles.uderline}
            initial={{ width: 0 }}
            whileInView={{
              width: matches ? 700 : 300,
              transition: { duration: 0.7 },
            }}
          ></motion.span>
        </div>
        {matches ? (
          <motion.div className={Styles.cardbox}>
            {services.map((el) => (
              <Card
                key={el.id}
                title={el.title}
                img={el.img}
                dec={el.description}
              />
            ))}
          </motion.div>
        ) : (
          <div className={Styles.wrapper}>
            <motion.div className={Styles.cardbox}>
              {services.map((el) => {
                if (next === el.id) {
                  return (
                    <Card
                      key={el.id}
                      title={el.title}
                      img={el.img}
                      dec={el.description}
                    />
                  );
                } else return;
              })}
            </motion.div>
            <div className={Styles.btnbox}>
              <motion.img
                 initial={{ scale: 1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className={Styles.actionbtn}
                onClick={handelprev}
                src={nextimg}
                alt=""
              />
              <motion.img
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                className={Styles.actionbtn}
                src={nextimg}
                onClick={handelnext}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Services;
