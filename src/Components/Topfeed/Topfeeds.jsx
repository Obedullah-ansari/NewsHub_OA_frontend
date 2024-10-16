import { useEffect, useState } from "react";
import Styles from "./Topfeed.module.css";
import arrow from "../../assets/next.png";
import { motion } from "framer-motion";
function Topfeeds() {
  const [topNewsId, setTopNewsId] = useState("INDIA");
  const [topNewsHeadlines, setTopNewsHeadlines] = useState([]);

  const slidearray = ["INDIA", "SPORTS", "EDUCATION", "TECHNOLOGY"];
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  const changeCategory = (direction) => {
    setCurrentIndex((prevIndex) => {
      let newIndex =
        direction === "next"
          ? (prevIndex + 1) % slidearray.length
          : (prevIndex - 1 + slidearray.length) % slidearray.length;

      setTopNewsId(slidearray[newIndex]); // Update the topNewsId
      return newIndex; // Return the new index
    });
  };

  useEffect(() => {
    const handelTopNews = async () => {
      const response = await fetch(
        `http://localhost:4000/api/v1/headlines/topheadlines/${topNewsId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setTopNewsHeadlines(data);
      }
    };
    handelTopNews();
  }, [topNewsId]);

 

  return (
    <div className={Styles.topnewsconatiner}>
      <div className={Styles.sliderbtn}>
        <motion.img
          initial={{ scale: 1 ,rotate:180}}
          whileTap={{ scale: 0.9 }}
          onClick={changeCategory}
          src={arrow}
          alt=""
        />
        <span>{topNewsId}</span>

        <motion.img
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeCategory}
          src={arrow}
          alt=""
        />
      </div>
      <div className={Styles.subtopdiv}>
        {topNewsHeadlines.map((topnews, index) => (
          <>
           
         <p key={index} className={Styles.toplist}>{topnews.topheadline}.</p>
            
          </>
        ))}
      </div>
    </div>
  );
}

export default Topfeeds;
