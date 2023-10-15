import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/product2.css";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Product2() {
  const { id } = useParams();

  const [price, setPrice] = useState();
  const [pizza, setPizza] = useState();
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const host = process.env.REACT_APP_HOST;
  const getPizza = async () => {
    const response = await fetch(`${host}/api/pizza/getpizza/${id}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
    });

    //parse json response in fetchedNotes
    const fetchedPizza = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setPizza(fetchedPizza);
    setLoading(false);
    setPrice(fetchedPizza.prices[0]);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
 
  

  useEffect(() => {
    getPizza();
    // eslint-disable-next-line
    scrollToTop();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const selectSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleExtraChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleAddClick = () => {
    
    dispatch(addProduct({ ...pizza, extras, price, quantity, size }));
    toast.success("Added to cart!");
  };

  return (
    <div className="productcontainer">
      <div className="productleft">
        <div className="productimgContainer">
          <img src={pizza.image} className="productpizzaimage" alt="" />
         
        </div>
      </div>
      <div className="productright">
        <h1 className="producttitle">{pizza.title}</h1>
        <span className="productprice">₹{price}</span>
        <p className="productdesc">{pizza.description}</p>
        <h3 className="productchoose">Choose the size</h3>
        <div className="productsizes">
          <div className="productsizecontainer" onClick={() => selectSize(0)}>
            <img
              src="/img/size.png"
              style={{ layout: "fill" }}
              className="productsize"
              alt=""
            />
            <span className="productnumber1">Small</span>
          </div>
          <div className="productsizecontainer" onClick={() => selectSize(1)}>
            <img
              src="/img/size.png"
              style={{ layout: "fill" }}
              className="productsize2"
              alt=""
            />
            <span className="productnumber2">Medium</span>
          </div>
          <div className="productsizecontainer" onClick={() => selectSize(2)}>
            <img
              src="/img/size.png"
              style={{ layout: "fill" }}
              className="productsize3"
              alt=""
            />
            <span className="productnumber3">Large</span>
          </div>
        </div>
        <h3 className="productchoose">Choose additional ingredients</h3>
        <div className="productingredients">
         

        
          {pizza.extraOptions.map((option) => (
            <div className="productoption" key={option._id}>
              <input
                type="checkbox"
                id={option._id} 
                name={option.text}
                className="productcheckbox"
                onChange={(e) => handleExtraChange(e, option)}
               
              />
              <label htmlFor={option._id}>{option.text}</label>
            </div>
          ))}
        
        </div>
        <div className="productadd">
          <input
            type="number"
            defaultValue={1}
            className="productquantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Link to="/pizzalist2">
       
            <button className="productbutton" onClick={handleAddClick}>
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product2;
