import { useEffect, useState } from "react";
import Styles from "./pages.module.css";
import Newsbox from "./Newsbox";
import Todolist from "./Notes/Todolist";
import { useNavigate } from "react-router-dom";

function Headlines({ id, showbtn, fun, newstypeupdate, speakauto }) {
  const navigate = useNavigate();
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [voice, setVoice] = useState(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(-1); // New state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function handelNewsHeadlines(id) {
      let responsedata = [];
      const token = localStorage.getItem("token");

      setLoading(true); // Start loading

      if (newstypeupdate === "national") {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/headlines/${id}`
        );
        responsedata = await response.json();
        stopSpeaking();
      } else if (newstypeupdate === "global") {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/headlines/global/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Send token for protected routes
            },
          }
        );
        responsedata = await response.json();
        stopSpeaking();
        if (!response.ok) {
          navigate("/NewsHub_OA_frontend/authorization");
          return;
        }
      }

      setNewsHeadlines(responsedata);
      setLoading(false); // Stop loading
    }

    handelNewsHeadlines(id);

    const synth = window.speechSynthesis;
    const assignVoice = () => {
      const voices = synth.getVoices();

      // Log available voices for debugging

      // Attempt to find a preferred female Indian voice
      const preferredVoice =
        voices.find((v) => v.name === "Rishi") || // First check for "Rishi"
        voices.find((v) => v.lang.includes("en-IN")) || // Then check for Indian English
        voices.find((v) => v.lang.includes("en-US")  )||
        voices[0]; // Finally, fallback to the first available voice if no English voice found

      setVoice(preferredVoice);
    };

    // Check if voices are available and assign immediately if they are
    if (synth.getVoices().length > 0) {
      assignVoice();
    } else {
      synth.onvoiceschanged = assignVoice;
    }

    return () => {
      synth.onvoiceschanged = null; // Cleanup to avoid memory leaks
    };
  }, [id, newstypeupdate, navigate]);

  const shortenText = (text) => {
    return (
      text.split(" ").splice(0, 15).join(" ") +
      (text.split(" ").length > 15 ? "..." : "")
    );
  };

  const speakAll = () => {
    if (!voice) {
      console.log("no voice is available");
      return;
    }

    newsHeadlines.forEach((headline, index) => {
      const utterance = new SpeechSynthesisUtterance(
        shortenText(headline.headline)
      );
      utterance.voice = voice; // Set the selected voice
      utterance.pitch = 0;
      utterance.rate = 1; // Adjust rate for better clarity

      utterance.onstart = () => {
        setCurrentHeadlineIndex(index); // Update the current headline index
      };

      // Reset index when done
      utterance.onend = () => {
        setCurrentHeadlineIndex(-1); // Reset when done
      };

      speechSynthesis.speak(utterance);
    });
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setCurrentHeadlineIndex(-1); // Reset when stopped
  };

  useEffect(() => {
    if (speakauto) {
      console.log("on");
      speakAll();
    } else {
      console.log("off");
      stopSpeaking();
    }
  }, [speakauto]);

  return (
    <>
      <div className={Styles.hdwrapper}>
        {loading ? ( // Check if loading
          <div className={Styles.waitingdiv}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
            <p className={Styles.visually}>Loading...</p>
          </div>
        ) : (
          newsHeadlines.map((headlines, index) => (
            <Newsbox
              key={index}
              img={headlines.imageUrl}
              text={headlines.headline}
              link={headlines.href}
              onstart={speakAll}
              onstop={stopSpeaking}
              Index={index}
              currin={currentHeadlineIndex}
            />
          ))
        )}
      </div>

      {showbtn && <Todolist btn={fun} />}
    </>
  );
}

export default Headlines;
