import { useState } from "react";
import Headlines from "./Headlines";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [Newsid, setNewsid] = useState("ToI");
  const [todolist, setTodolist] = useState(false);
  const [upadatenews, setupdatenew] = useState("national");
  const [speakAuto, setSpeakAuto] =useState(false)

  function handelNewsupdate(newsType) {
    setupdatenew(newsType);
  }
  function handelspeak(){
    setSpeakAuto((prev)=>!prev)
  }

  const handeltotolist = () => {
    const token = localStorage.getItem("token");
    if (token) setTodolist((prev) => !prev);
    else
    navigate("/authorization")
    
  };

  function handelNewsId(id) {
    setNewsid(id);
    console.log(id);
  }
  return (
    <>
      <section>
        <Navbar
          idBtn={handelNewsId}
          showfun={handeltotolist}
          newstype={handelNewsupdate}
          speakauto={handelspeak}
          offon={speakAuto}
        />
        <Headlines
          id={Newsid}
          showbtn={todolist}
          fun={handeltotolist}
          newstypeupdate={upadatenews}
          speakauto={speakAuto}
        />
      </section>
    </>
  );
}

export default Header;
