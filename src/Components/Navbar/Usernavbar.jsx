import Styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage";
import Model from "./Model";
import upload from "../../assets/file.png";
import trash from "../../assets/trash.png";
import close from "../../assets/closeblack.png";
import { useDispatch } from "react-redux";
import defimg from "../../assets/user.png";


function Usernavbar() {
  const apiUrl = import.meta.env.VITE_API_URL;


  const dispatch = useDispatch();
  const [userinfo, setuserinfo] = useState(false);
  const [userDetails, setUserDetails] = useState({
    image: defimg,
    name: "",
    email: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fileInputRef = useRef(null);

  const handleuserinfo = () => {
    setuserinfo((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch({ type: "Logout" }); // Update the Auth state and localStorage
  };

  useEffect(() => {
    const handelUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `${apiUrl}api/v1/auth/profile/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const userPhoto =
          data.data.user.photo === "default.jpg"
            ? defimg
            : `${apiUrl}uploads/users/${data.data.user.photo}`;

        setUserDetails({
          image: userPhoto,
          name: data.data.user.name,
          email: data.data.user.email,
        });
      } catch (error) {
        console.error(error);
      }
    };

    handelUserData();
  }, []);

  const handleImageUpload = async () => {
    const token = localStorage.getItem("token");
    try {
      const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels);
      const formData = new FormData();
      formData.append("photo", croppedImage);

      const response = await fetch(
        `${apiUrl}api/v1/auth/updateProfile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          image: `${apiUrl}uploads/users/${updatedData.data.user.photo}`,
        }));
        console.log("Profile photo updated successfully");
        dispatch({ type: "updateprofilephoto" });
      } else {
        console.error("Failed to update profile photo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    setShowModal(true);
  };

  const handleUpdateProfile = async () => {
    await handleImageUpload();
    setShowModal(false);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/auth/deletePhoto`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          image: defimg,
        }));
        console.log("Profile photo deleted successfully");
        dispatch({ type: "updateprofilephoto" });
      } else {
        console.error("Failed to delete profile photo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const variants = {
    initial: {
      clipPath: "circle(25px at 90% 5%)",
    },
    open: {
      clipPath: "circle(1080px at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 60,
      },
    },
    closed: {
      clipPath: "circle(25px at 90% 4%)",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
  };
  const upload_delimg = userDetails.image === defimg ? upload : trash;

  return (
    <>
      <div className={Styles.userinfoconatiner}>
        <motion.div
          className={Styles.userinfo}
          variants={variants}
          initial="initial"
          animate={userinfo ? "open" : "closed"}
        >
          <div className={Styles.uerimg}>
            <img
              className={Styles.userprofileimg}
              src={userDetails.image}
              alt="User"
            />

            <div className={Styles.userimginfo}>
                <label
                htmlFor="file-upload"
                className={Styles.customFileLabel}
                onClick={
                  userDetails.image === defimg
                    ? () => fileInputRef.current.click()
                    : handleDeletePhoto
                }
              >
                <img src={upload_delimg} alt="Upload or Delete" />
              </label>
            </div>
          </div>
          <div className={Styles.userdetail}>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className={Styles.aboutuser}>
              <span>
                {" "}
                <span>User </span>
                {userDetails.name}
              </span>
              <span>
                <span>Email </span>
                {userDetails.email}
              </span>
            </div>
            <a href="#" onClick={handleLogout} className={Styles.logout}>
              Logout
            </a>
          </div>
        </motion.div>

        {userinfo ? (
          <motion.img
            src={close}
            initial={{ x: -50, rotate: 0 }}
            whileInView={{ x: 0, rotate: 360, transition: { duration: 0.3 } }}
            className={Styles.infoclosebnt}
            onClick={handleuserinfo}
            alt="Close"
          />
        ) : (
          <motion.img
            src={userDetails.image}
            className={Styles.userinfoclosebnt}
            onClick={handleuserinfo}
          />
        )}
      </div>
      {showModal && (
        <Model isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className={Styles.cropContainer}>
            <Cropper
              image={selectedFile}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ containerStyle: { backgroundColor: "transparent" } }}
            />
          </div>
          <button className={Styles.updateimgbtn} onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </Model>
      )}
    </>
  );
}

export default Usernavbar;
