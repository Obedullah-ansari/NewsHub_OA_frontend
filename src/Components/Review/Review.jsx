import styles from "./Review.module.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Listitem from "./Listitem";
import StarRating from "./StarRating";
import { useSelector } from "react-redux";
import Modal from "./Modal"; // Import the Modal component

function Review() {
  const updateInfoApp = useSelector((state) => state.update);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Directly fetching userId from localStorage
  const [updateReviews, setUpdateReviews] = useState(false);
  const [userData, setUserData] = useState({ review: "", rating: 0 });
  const [userReview, setUserReview] = useState([]);
  const [userReviewExists, setUserReviewExists] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [modalMessage, setModalMessage] = useState("");
  const [tooglebtnreview, settooglebtnreview] = useState(false);

  const Auth = useSelector((state) => state.Auth);

  const handelslidetoogle = () => {
    settooglebtnreview((prev) => !prev);
  };

  const handeluserdata = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setUserData({
      ...userData,
      rating: Number(rating),
    });
  };

  const validateReview = () => {
    if (!Auth) {
      setModalMessage(
        <p className={styles.messagep}>Please log in to submit a review 🔒</p>
      );
      setShowModal(true); // Show modal if user is not logged in
      return false;
    }
    if (!userData.review) {
      setModalMessage(
        <p className={styles.messagep}>Please enter a review ✍🏻</p>
      );
      setShowModal(true); // Show modal for empty review
      return false;
    }
    if (!userData.rating) {
      setModalMessage(
        <p className={styles.messagep}>Please enter a rating ⭐️</p>
      );
      setShowModal(true); // Show modal for empty rating
      return false;
    }
    return true;
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/auth/allreviews`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserReview(data.data);
          if (Auth && userId) {
            const userExistingReview = data.data.find(
              (review) => review.user === userId
            );
            if (userExistingReview) {
              setUserReviewExists(true);
              setUserData({
                review: userExistingReview.review,
                rating: userExistingReview.rating,
              });
            }
          } else {
            setUserReviewExists(false);
            setUserData({
              review: "",
              rating: "",
            });
          }
        } else {
          console.error(`Failed to fetch reviews: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    }
    fetchReviews();
  }, [updateReviews, updateInfoApp, Auth]);

  async function handelform(e) {
    e.preventDefault();
    if (!validateReview()) {
      setShowModal(true);
      return;
    }
    try {
      const url = userReviewExists
        ? `${import.meta.env.VITE_API_URL}api/v1/auth/updateReview`
        : `${import.meta.env.VITE_API_URL}api/v1/auth/review`;
      const method = userReviewExists ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        if (!userReviewExists) {
          // Show modal only for new review submissions
          setModalMessage(
            <p className={styles.headingforreview}>
              Thank you for reviewing us, we will do our best to improve 😇.
            </p>
          );

          setShowModal(true);
        }
        setUpdateReviews((prev) => !prev);
        handelslidetoogle();
      } else {
        throw new Error(`Request failed`);
      }
    } catch (error) {
      console.error(
        "Error occurred while submitting the review:",
        error.message
      );
    }
  }

  async function handleDeleteReview() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/auth/deleteReview`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUserData({ review: "" });
        setUserReviewExists(false);
        setUpdateReviews((prev) => !prev);
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error occurred while deleting the review:", error.message);
    }
  }

  const variants = {
    initial: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    animate: { x: -1500, opacity: 0, transition: { duration: 0.5 } },
  };
  const reviewvariants = {
    initial: { x: 500, zIndex: -2, opacity: 0, transition: { duration: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            <span>Our Users</span> Loves <span>What we do</span>
            <p className={styles.description}>
              Hear from our satisfied users and explore how our services <br />{" "}
              have made a difference for them!
            </p>
          </h1>
        </div>
        <motion.div
          className={styles.subcont}
          variants={variants}
          animate={tooglebtnreview ? "animate" : "initial"}
        >
          <div className={styles.reviewitems}>
            <Listitem info={userReview} deletefun={handleDeleteReview} />
          </div>
        </motion.div>

        <motion.div
          className={styles.Contact}
          variants={reviewvariants}
          animate={tooglebtnreview ? "animate" : "initial"}
        >
          <form onSubmit={handelform} className={styles.contactbio}>
            <h2>{userReviewExists ? "Edit Your Review" : "Submit a Review"}</h2>
            <StarRating
              rating={userData.rating}
              onRatingChange={handleRatingChange}
            />
            <motion.textarea
              initial={{ x: 130, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
              value={userData.review}
              onChange={handeluserdata}
              name="review"
              cols="10"
              rows="10"
              placeholder="How's your experience"
            ></motion.textarea>
            <button type="submit" className={styles.submtbtn}>
              {userReviewExists ? "Update" : "Submit"}
            </button>
          </form>
        </motion.div>
        <div>
          <button
            onClick={handelslidetoogle}
            className={styles.tooglebtnreview}
          >
            {" "}
            {tooglebtnreview ? "Read more" : "Review us"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
