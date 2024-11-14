import styles from "./Review.module.css";
import dtbtn from "../../assets/dt.png";
import defaultUserImg from "../../assets/user.png";
import { useSelector } from "react-redux";
import { easeInOut, motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import StarRating from "./StarRating";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Listitem({ info, deletefun }) {
  
  const matches = useMediaQuery("(min-width:600px)");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Show arrows
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { Auth, User } = useSelector((state) => ({
    Auth: state.Auth,
    User: state.User,
  }));

  // State to track the expanded state for each review
  const [expanded, setExpanded] = useState({});

  // Function to toggle expanded state for a specific review
  const toggleExpanded = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const variants = {
    initial: {
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    animate: {
      y: "-45%",
      zIdex: 3,
      transition: {
        duration: 0.4,
      },
    },
  };

  const backvariants = {
    initial: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  const shortTextLength = (matches ? 350: 180);

  return (
    <>
      <Slider {...settings}>
        {info.map((review, index) => {
          const isOwner = Auth && User === review.user;

          // Conditional image source
          const userImageSrc =
            review.photo === "default.jpg" 
              ? defaultUserImg
              : `${import.meta.env.VITE_API_URL}uploads/users/${review.photo}`;

          // Check if the review is expanded and define short text length
          const isExpanded = expanded[index];
          const shortText = review.review.slice(0, shortTextLength);
          const remainingText = review.review.slice(shortTextLength); // Adjust the character limit as needed

          return (
            <div className={styles.reviewbox} key={index}>
              {isOwner && (
                <img
                  className={styles.deleteicon}
                  src={dtbtn}
                  onClick={() => deletefun()}
                  alt="Delete"
                />
              )}
              <motion.div
                className={styles.subreview}
                variants={backvariants}
                animate={isExpanded ? "animate" : "initial"}
              >
                <motion.img
                src={userImageSrc} />
                <span className={styles.username}>{review.name}</span>
                <StarRating rating={review.rating} readOnly={true} />
              </motion.div>

              <div className={styles.reviewtext}>
                <motion.span
                  variants={variants}
                  animate={isExpanded ? "animate" : "initial"}
                  className={styles.textparaofreview}
                >
                  {isExpanded ? (
                    <>
                      {shortText}
                      <span
                        className={styles.textreviewtext}
                      >
                        {remainingText}
                      </span>
                    </>
                  ) : (
                    `${shortText}`
                  )}
                  {review.review.length > 250 && ( // Only show for longer reviews
                    <button
                      className={styles.readMoreButton}
                      onClick={() => toggleExpanded(index)}
                    >
                      {isExpanded ? "View less" : "Read more"}
                    </button>
                  )}
                </motion.span>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default Listitem;
