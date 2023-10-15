import React, { useEffect } from "react";
import "../style/home.css";

import PizzaList2 from "./PizzaList2";
import Features2 from "./Features2";

function Home() {
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="home">
      <Features2 />
      <PizzaList2 />
    </div>
  );
}

export default Home;
