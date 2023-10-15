import React, { useState, useEffect } from "react";
import "../style/features.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
];

function Features2() {
  const [index, setIndex] = useState(0);

  // Add a state variable to keep track of the active dot
  const [activeDot, setActiveDot] = useState(0);

  const handleClick = (direction) => {
    if (direction === "L") {
      setIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : images.length - 1));
    }
    if (direction === "R") {
      setIndex((prevIndex) => (prevIndex !== images.length - 1 ? prevIndex + 1 : 0));
    }
  };

  // Automatically scroll to the next image every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex !== images.length - 1 ? prevIndex + 1 : 0));
    }, 6000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update the active dot when the index changes
  useEffect(() => {
    setActiveDot(index);
  }, [index]);

  return (
    <div className="home">
      <div className="scrollbtnL">
        <AiOutlineLeft onClick={() => handleClick("L")} />
      </div>

      <div className="imagecard">
        {images.map((image, i) => (
          <div
            className="imagelist"
            key={i}
            style={{ transform: `translateX(${-100 * index}vw)` ,transition:" all 1.5s ease-in-out" }}
          >
            <img src={image} alt="image" />
          </div>
        ))}
      </div>

      <div className="scrollbtnR">
        <AiOutlineRight onClick={() => handleClick("R")} />
      </div>

      <div className="dots">
        {images.map((i) => (
          <div
            key={i}
            className={`dot ${i === activeDot ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Features2;
