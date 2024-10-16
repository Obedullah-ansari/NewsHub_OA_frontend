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

  useEffect(() => {
    async function handelNewsHeadlines(id) {
      let responsedata = [];
      const token = localStorage.getItem("token");

      if (newstypeupdate === "national") {
        const response = await fetch(
          `http://localhost:4000/api/v1/headlines/${id}`
        );
        responsedata = await response.json();
        stopSpeaking();
      } else if (newstypeupdate === "global") {
        const response = await fetch(
          `http://localhost:4000/api/v1/headlines/global/${id}`,
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
          navigate("/authorization");
          return;
        }
      }
      setNewsHeadlines(responsedata);
    }

    handelNewsHeadlines(id);

    const synth = window.speechSynthesis;
    const assignVoice = () => {
      const voices = synth.getVoices();

      // Log available voices for debugging
      console.log("Available Voices: ", voices);

      // Attempt to find a preferred female Indian voice

      const preferredVoice =
        voices.find((v) => v.name === "Rishi") || // Set to "Rishi" if available
        voices.find((v) => v.lang.includes("en-IN")) || // Fallback to any Indian voice
        voices[0]; // Fallback to the first available voice
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
      console.log("no voice is avialble");
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
        {newsHeadlines.map((headlines, index) => (
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
        ))}
      </div>

      {showbtn && <Todolist btn={fun} />}
    </>
  );
}

export default Headlines;
