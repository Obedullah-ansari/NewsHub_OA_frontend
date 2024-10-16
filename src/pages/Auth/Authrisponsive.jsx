import { useState } from "react";
import Styles from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";
import {  motion } from "framer-motion";

function Authrisponsive() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", passwordConfirmed: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirmed: formData.passwordConfirmed,
        };

    const response = await fetch(
      `http://localhost:4000/api/v1/auth/${isLogin ? "login" : "signup"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      if (isLogin) localStorage.setItem("userId", data.userId);
      else localStorage.setItem("userId", data.data.newUser._id);
      navigate("/");
    }
  };

 

  const variants = {
    hidden: { y: "100%", opacity: 0, transition: { duration: 0.5 } },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.5 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };
  const signupvariants = {
    initial: { y: "100%", transition: { duration: 0.2,  staggerChildren: 0.1 },},
    animate: {
      y: "0%",
      transition: { duration: 0.2,  staggerChildren: 0.1 },
    },
  };
  return (
    <section>
      <div className={Styles.container}>
        {/* Toggle button */}
        <div className={Styles.togglediv}>
          <button onClick={toggleForm} className={Styles.toggleBtn}>
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </div>
        <motion.div className={Styles.backdiv}>
          {/* Separate Login Form */}

          <motion.div
            className={Styles.logintab}
            variants={variants}
            initial="hidden"
            animate={isLogin ? "visible" : "hidden"}
          >
            <div className={Styles.infobar}>
              <h2>Signin</h2>
            </div>
            <form onSubmit={handleSubmit} className={Styles.loginform}>
              <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Enter password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className={Styles.forgetpassowrd}>forget password</span>
              <button type="submit" className={Styles.submitBtn}>
                Signin
              </button>
            </form>
          </motion.div>

          <motion.div className={Styles.singuptab}>
            <div className={Styles.infobar}>
              <h2>Signup</h2>
            </div>
           
              <motion.form
                onSubmit={handleSubmit}
                className={Styles.form}
                variants={signupvariants}
                initial="initial"
                animate={isLogin? "initail" :"animate" }
              >
                <motion.input
                  variants={signupvariants}
                  placeholder="Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <motion.input
                  variants={signupvariants}
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <motion.input
                  variants={signupvariants}
                  placeholder="Enter password"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <motion.input
                  variants={signupvariants}
                  placeholder="Confirm password"
                  type="password"
                  id="passwordConfirmed"
                  name="passwordConfirmed"
                  value={formData.passwordConfirmed}
                  onChange={handleChange}
                  required
                />
                <motion.button
                  type="submit"
                  className={Styles.submitBtn}
                  variants={signupvariants}
                >
                  Signup
                </motion.button>
              </motion.form>
          
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Authrisponsive;
