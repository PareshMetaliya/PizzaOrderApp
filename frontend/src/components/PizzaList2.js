import React, { useEffect, useState } from "react";
import PizzaCard2 from "./PizzaCard2";
import "../style/pizzaList2.css";



function PizzaList2() {

  const host = process.env.REACT_APP_HOST;

  let pizzasInitial = [];
  const [pizzaList, setPizzaList] = useState(pizzasInitial);

  const getPizzas = async () => {
    const response = await fetch(`${host}/api/pizza/fetchallpizzas`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
      // headers: {
      //   // auth_Token:
      //   //   localStorage.getItem('token'),
      //   // auth_Token:
      //   //   localStorage.getItem('token'),
      // },
    });

    //parse json response in fetchedNotes
    const fetchedPizzas = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setPizzaList(fetchedPizzas);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

 

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
    scrollToTop();
  }, []);

  return (
    <div className="pizzalistcontainer">
      <h1 className="pizzalisttitle">
        Surat's Highest Rated Pizza Delivery Chain
      </h1>

      <p className="pizzalistdesc">
      "Enjoy the taste of home with our Mom's Homemade Pizza – a delightful blend of fresh ingredients on a crispy crust, made with love. It's a family recipe that's been passed down for generations, and each bite carries the warmth of tradition."
      </p>
      <div className="pizzalistwrapper">
      
        {pizzaList.map((pizza) => {
          //passing a notes data as a props to NotesCard component
          return <PizzaCard2 key={pizza._id} pizza={pizza} />;
        })}
      </div>
    </div>
  );
}

export default PizzaList2;
