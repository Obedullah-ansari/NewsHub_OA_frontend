import Styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/newspaper.png";
import close from "../../assets/cancel.png";
function Sidebar({ sidebar, onclick }) {
  const sidevariants = {
    closed: {
      x: -500,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      x: -4,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      className={Styles.smallnavbar}
      variants={sidevariants}
      animate={sidebar ? "open" : "closed"}
    >
      <div className={Styles.closebar}>
        <p href="#" className={Styles.closebarlogo}>
          <img style={{ width: "2.5rem" }}  src={logo} alt="" /> NewsHub
        </p>
        <span onClick={onclick}>
          <img style={{ width: "1.5rem" }} src={close} alt="" />
        </span>
      </div>
      <div className={Styles.smallnavabardata}>
        <a onClick={onclick} href="#hero">
          Home
        </a>
        <a onClick={onclick} href="#contact">
          Top fives
        </a>
        <a onClick={onclick} href="#services">
          Services
        </a>
        {<Link to="/NewsHub_OA_frontend/authorization">Login/signup</Link>}
      </div>
    </motion.div>
  );
}

export default Sidebar;
