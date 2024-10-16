import { useEffect } from 'react';
import Hero from "./Components/Hero/Hero.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Review from "./Components/Review/Review.jsx";

const Allapp = () => {
  useEffect(() => {
    // Simple smooth scrolling behavior
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      section.style.scrollBehavior = 'smooth';
    });

  }, []);

  return (
    <>
      <section id="hero">
        <Navbar />
        <Hero />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="review">
        <Review />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Allapp;



