import { randIntBetween } from "@/app/utils";
import React, { useEffect, useRef, useState } from "react";

function index() {
  const loopRef = useRef<NodeJS.Timeout>();
  const [counter, setCounter] = useState(0);
  const [emojis, setEmojis] = useState("");
  const [emojisClass, setEmojisClass] = useState("");

  const counterLoop = () => {
    clearTimeout(loopRef.current);
    loopRef.current = setTimeout(() => {
      setCounter((counter + 1) % 5);
      if (counter === 0) setEmojis("");
      else {
        let newEmojis = emojis;
        const emojisToPickFrom = ["😃", "😄", "😁", "😆", "😘"];
        newEmojis += emojisToPickFrom[randIntBetween(0, emojisToPickFrom.length - 1)] + " ";
        setEmojis(newEmojis);
      }
      if (counter === 4) setTimeout(() => setEmojisClass("emojis-fall"), 500);
      else setEmojisClass("");
      counterLoop();
    }, 1000);
  };
  useEffect(() => {
    counterLoop();
  });

  return (
    <section className="intro-page">
      <div className="intro-page__parallax-space-creator" />
      <div className="intro-page__content">
        <h1 className="intro-page__title">Mike Silverman</h1>
        <span className="intro-page__sub-title">Not just another self taught developer</span>
        {
          // <span className={`intro-page__sub-title--big emojis ${emojisClass}`}>{emojis}</span>
        }
      </div>
    </section>
  );
}

export default index;
