import Styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/newspaper.png";
import Sidebar from "./Sidebar";
import Usernavbar from "./Usernavbar";
import { useSelector } from "react-redux";
import open from "../../assets/menu.png";
import { easeInOut, motion } from "framer-motion";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <div className={Styles.navcontiner}>
        <motion.img
          src={open}
          alt=""
          className={Styles.sidebtn}
          onClick={handleSidebar}
          whileTap={{
            rotate: 20,
            transition: { duration: 0.1, ease: easeInOut },
          }}
        />

        <div className={Styles.navbody}>
          <a href="#" className={Styles.logoimage} >
            <img style={{ width: "2.5rem" }} src={logo} alt="" /> NewsHub
          </a>
          <a href="#hero">Home</a>
          <a href="#contact">Top Fives</a>
          <a href="#services">Services</a>
          {<Link to="/NewsHub_OA_frontend/authorization">Login/signup</Link>}
        </div>
        <Sidebar sidebar={sidebar} onclick={handleSidebar} />

        {Auth && <Usernavbar />}
      </div>
    </>
  );
}

export default Navbar;
