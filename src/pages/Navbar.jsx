import logo from "../assets/newspaper.png";
import file from "../assets/file.png";
import Styles from "./pages.module.css";
import micon from ".././assets/minon.png";
import micoff from ".././assets/micoff.png";

function Navbar({ idBtn, showfun, newstype, speakauto, offon }) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <p className="navbar-brand" href="#">
            <img style={{ width: "2.5rem" }} src={logo} alt="" /> NewsHub
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" onClick={() => idBtn("TOI")}>
                Times Of India
              </a>
              <a
                className="nav-link active"
                aria-current="page"
                onClick={() => idBtn("HT")}
              >
                Hindustan Times
              </a>
              <a className="nav-link" onClick={() => idBtn("TH")}>
                The Hindu
              </a>
              <a className="nav-link" onClick={() => newstype("global")}>
                Global{" "}
                <img
                  className={Styles.navimg}
                  src="https://i.gifer.com/origin/7e/7eb12511c10312207ef4ba12b1769a2e_w200.gif"
                  alt=""
                />
              </a>
              <a className="nav-link" onClick={() => newstype("national")}>
                National{" "}
                <img
                  className={Styles.navimg}
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/India_Map_Animation_Created_by_samnad.s_Kudappanamoodu.gif"
                  alt=""
                />
              </a>

              <a className="nav-link" onClick={() => showfun()}>
                Note <img className={Styles.notebtn} src={file} alt="" />
              </a>

              <a className="nav-link " onClick={() => speakauto()}>
                {offon ? (
                  <img src={micoff} style={{ width: "2.4rem" }} alt="" />
                ) : (
                  <img
                    src={micon}
                    style={{
                      width: "2.4rem",
                      backgroundColor: "white",
                      borderRadius: "2.5rem",
                    }}
                    alt=""
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
