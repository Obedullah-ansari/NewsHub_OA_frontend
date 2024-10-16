import { useState } from "react";
import Styles from "./SignupPage.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import Authrisponsive from "./Authrisponsive";
import Particle from "../Particlejs/particle";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(""); // New state for error handling
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
    setError(""); // Clear any previous error when toggling form
    setforgeterror("")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error on new submit attempt

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
        localStorage.setItem(
          "userId",
          isLogin ? data.userId : data.data.newUser._id
        );

        dispatch({
          type: "Auth",
          payload: data.token,
        });
        dispatch({
          type: "User",
          payload: data.userId || data.data.newUser._id,
        });

        navigate("/");
      } else {
        setError(data.message || "An error occurred, please try again."); // Set error from backend or default message
      }
    } catch (err) {
      setError("Network error, please try again later."); // Network error handling
    }
  };

  const handelforgetpassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/forgetpassword",
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
    initial: { x: 0, transition: { duration: 0.5 } },
    slideleft: { x: "-100%", transition: { duration: 0.5 } },
    slideright: { x: "99.9%", transition: { duration: 0.5 } },
  };

  return (
    <section>
      <motion.div className={Styles.container}>
        <Particle className={Styles.particle} />
        {matches ? (
          <motion.div
            className={Styles.backdiv}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1, transition: { duration: 0.5 } }}
          >
            <motion.div
              className={Styles.infotab}
              variants={variants}
              animate={isLogin ? "slideright" : "initial"}
            >
              <div className={Styles.infotext}>
                {isLogin ? (
                  <motion.div>
                    <h1>Welcome back !</h1>
                    <p>Please login and continue your journey with us.</p>
                  </motion.div>
                ) : (
                  <motion.div>
                    <h1>Hellow,Friend!</h1>
                    <p>
                      Enter your personal details and start journey with us.
                    </p>
                  </motion.div>
                )}
                <p>or</p>
                <button onClick={toggleForm} className={Styles.toggleBtn}>
                  {isLogin ? " Signup" : "Signin"}
                </button>
              </div>

              <div className={Styles.infotext}>
                {isLogin ? (
                  <img
                    src="https://i.pinimg.com/originals/15/b5/b3/15b5b3fb25b19718f60a18c328641391.gif"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://living.acg.aaa.com/content/dam/aaa-living/devtest/what-is-two-factor-authentication.gif"
                    alt=""
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className={Styles.login_singup}
              variants={variants}
              initial="initial"
              animate={isLogin ? "slideleft" : "initial"}
            >
              <div className={Styles.infobar}>
                <h2>{isLogin ? "Signin" : "Signup"}</h2>
              </div>

              <form onSubmit={handleSubmit} className={Styles.form}>
                {error && (
                  <p
                    style={{ fontSize: "1rem", color: "red" }}
                    className={Styles.errorMessage}
                  >
                    {error}
                  </p>
                )}
                {forgeterror && (
                  <p
                    style={{ fontSize: "1rem", color: "red" }}
                    className={Styles.forgeterrorMessage}
                  >
                    {forgeterror}
                  </p>
                )}
                {!isLogin && (
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                  />
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
                {isLogin && (
                  <span
                    className={Styles.forgetpassowrd}
                    onClick={handelforgetpassword}
                  >
                    {forgeterror ? "resend link" : "forget password"}
                  </span>
                )}

                {!isLogin && (
                  <input
                    placeholder="Confirmed password"
                    type="password"
                    id="passwordConfirmed"
                    name="passwordConfirmed"
                    value={formData.passwordConfirmed}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                )}

                <button type="submit" className={Styles.submitBtn}>
                  {isLogin ? "Signin" : "Signup"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <Authrisponsive />
        )}
      </motion.div>
    </section>
  );
};

export default Signup;
