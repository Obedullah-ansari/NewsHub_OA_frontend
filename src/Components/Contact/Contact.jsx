import Styles from "./Contact.module.css";
import Share from "../Share/Share.jsx";
import Topfeeds from "../Topfeed/Topfeeds.jsx";
import mywork from "../../assets/mywork.mov"

function Contact() {
  return (
    <>
      <div className={Styles.maindiv}>
        <div className={Styles.submaindiv}>
          <div className={Styles.mywork}>
            <h1>More of my work</h1>
            <div className={Styles.gifdiv}>
            <video className={Styles.video} controls muted>
                <source src={mywork} type="video/mp4" />
              </video>
            </div>
             <h1>I love to connect with you</h1>
               <a  href="https://www.linkedin.com/in/obedullah-ansari-369892331" className={Styles.connectbtn} >connect</a>
          </div>
          <div className={Styles.topfeeds}>
            <div className={Styles.topnewsheadlines}>
              <h1>Top Fives for you </h1>
            </div>

           <div className={Styles.subcontainertop}>
           <Topfeeds/>
           </div>
          </div>
        </div>

        <div className={Styles.footdiv}>
          <footer className={Styles.footer}>
            <p>Made with ❤️ by Ubaid</p>
            <p>
              Share with your friends and help them stay updated with the world!
            </p>
            <Share />
          </footer>
        </div>
      </div>
    </>
  );
}

export default Contact;
