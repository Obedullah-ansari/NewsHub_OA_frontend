import wt from "../../assets/i5.png"
import fb from "../../assets/i1.png"
import ld from "../../assets/i4.png"
import Styles from  "./Share.module.css"
function Share({message,url}) {
    const encodedMessage = encodeURIComponent(message);
    const encodedURL = encodeURIComponent(url);
  
    const shareOnWhatsApp = () => {
      window.open(`https://wa.me/?text=${encodedMessage}%20${encodedURL}`, '_blank');
    };
  
    const shareOnFacebook = () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`, '_blank');
    };
  
    const shareOnLinkedIn = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`, '_blank');
    };
  
    return (
      <div className={Styles.icondiv}>
        <img className={Styles.footerimg} src={wt} onClick={shareOnWhatsApp} alt="" />
        <img className={Styles.footerimg} src={fb} onClick={shareOnFacebook} alt="" />
        <img className={Styles.footerimg} src={ld} onClick={shareOnLinkedIn} alt="" />
      </div>
    );
}

export default Share;
