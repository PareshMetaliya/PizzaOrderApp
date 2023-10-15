import React from "react";
import "../style/pizzacard2.css";
import { Link } from "react-router-dom";

function PizzaCard2(props) {
  const { pizza } = props;

  return (
    <div className="pizzacardcontainer">
      <div className="pizzacardimage">
        <img src={pizza.image} alt="" className="cardimage" />
      </div>

      <div className="pizzacardcontent">
        <div className="item">
          <div className="productlabel">
            <div className="productlabel2">
              <div>
                <img
                  src="https://d2iz843c00i9tr.cloudfront.net/20230920175032/veg.02f4b29f05924399.png"
                  alt=""
                  className="veglogo"
                />
              </div>
              <div className="productName">{pizza.title}</div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="pizzacarddesc">{pizza.description}</div>
        </div>
        <div className="item">
          <div className="cardfooter">
            <div className="pizzacardprice">₹ {pizza.prices[0]}</div>
            <div className="cardbutton">
              <Link to={`/product2/${pizza._id}`}>
                <button type="button" className="btn">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard2;
