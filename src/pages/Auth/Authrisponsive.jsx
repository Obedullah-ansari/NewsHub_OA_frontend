import { useState } from "react";
import Styles from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";
import {  motion } from "framer-motion";

function Authrisponsive() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [forgeterror, setforgeterror] = useState("");
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
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirmed: formData.passwordConfirmed,
        };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/auth/${isLogin ? "login" : "signup"}`,
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
        if (isLogin) {
          localStorage.setItem("userId", data.userId);
        } else {
          localStorage.setItem("userId", data.data.newUser._id);
        }
        navigate("/NewsHub_OA_frontend");
      } else {
        // Set the error message if the response is not OK
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  const handelforgetpassword = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/auth/forgetpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setforgeterror("A reset link has been sent to your email");
        console.log("Reset link sent successfully");
      } else {
        setError(data.message || "An error occurred, please try again.");
      }
    } catch (error) {
      setError("Network error, please try again later.");
    }
  };

  const variants = {
    hidden: { y: "100%", opacity: 0, transition: { duration: 0.5 } },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.5 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };
  const signupvariants = {
    initial: { y: "110%", transition: { duration: 0.2, staggerChildren: 0.1 } },
    animate: {
      y: "0%",
      transition: { duration: 0.2, staggerChildren: 0.1 },
    },
  };

  const variantstoggle = {
    initial: { width: ["100%"], opacity: 1, transition: { duration: 0.5 } },
    animate: { width: ["0%", "100%", "0%"], transition: { duration: 0.5 } },
  };
  return (
    <section>
      <div className={Styles.containertwo}>
        <motion.div className={Styles.togglediv}>
          <button onClick={toggleForm} className={Styles.toggleBtn}>
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </motion.div>
        <motion.div className={Styles.backdiv}>

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
              {forgeterror ? (
                <p
                  style={{ fontSize: "1rem", color: "red" }}
                  className={Styles.forgeterrorMessage}
                >
                  {forgeterror}
                </p>
              ) : (
                error && (
                  <p
                    style={{ fontSize: "1rem", color: "red" }}
                    className={Styles.errorMessage}
                  >
                    {error}
                  </p>
                )
              )}

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
              <span
                className={Styles.forgetpassowrd}
                onClick={handelforgetpassword}
              >
                forget password
              </span>
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
              animate={isLogin ? "initail" : "animate"}
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
