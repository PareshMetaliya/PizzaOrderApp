import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import "../style/orderdetails2.css";

import {useNavigate } from "react-router-dom";

function OrderDetails2(props) {
  const navigate = useNavigate();

 

  const { total, products } = useSelector((state) => state.cart);

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    if(props.cash){
      const method=0;
    // props.createOrder({ customer, address, total, method: 0, products });}
    props.createOrder({ customer, address, total, method, products });}
    if(props.online){
      const method=1;
    props.createOrder({ customer, address, total, method, products });}

  };

  const handleClose=()=>{
    props.setCash(false);
    props.setOnline(false);
  }
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
    setClick(false);
  }, []);
  return (
    <div className="odrdetailscontainer">
      <div className="odrdetailswrapper">
        
          <span className="addclose2" onClick={handleClose}>X</span>
        
        <h1 className="odrdetailstitle">
          You will pay {total}.
        </h1>

        <div className="odrdetailsitem">
          <label className="odrdetailslabel">Name Surname</label>
          <input
            placeholder="Vickey Mehta"
            type="text"
            className="odrdetailsinput"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="odrdetailsitem">
          <label className="odrdetailslabel">Phone Number</label>
          <input
            type="text"
            placeholder="+91 980000000"
            className="odrdetailsinput"
          />
        </div>
        <div className="odrdetailsitem">
          <label className="odrdetailslabel">Address</label>
          <textarea
            rows={5}
            placeholder="6, Shreeji Apartment "
            type="text"
            className="odrdetailstextarea"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button disabled={click===true} className="odrdetailsbutton" onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetails2;
