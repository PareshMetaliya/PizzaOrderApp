import React from "react";

import "../style/navbar.css";
import { FiShoppingCart } from "react-icons/fi";
import { BiSolidPhoneCall, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const qty = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.cart.userdata);

  return (
    <>
      <div className="navbar">
        <div className="left">
          <div className="callbtn">
            <BiSolidPhoneCall />
          </div>
          <div className="number">
            <div className="textitem">Order Now!</div>
            <div className="textitem">+91-01234 56789</div>
          </div>
        </div>
        
        <div className="center">Mom's Pizza</div>


        <div className="links">
        <div>
          <Link to="/">
            <div className="signin">Home</div>
          </Link>
        </div>
        <div>
          <Link to="/pizzaList2">
            <div className="signin">Menu</div>
          </Link>
        </div>
        <div className="signin">
          {user ? (
            <Link to="/me">
              <div className="userme">
                <BiUserCircle className="userme" />
              </div>
            </Link>
          ) : (
            <Link to="/login2/nav">
              <div className="textitem signin">Sign in</div>
            </Link>
          )}
        </div>
        </div>

        <div className="right">
          <div className="cart">
            <Link to="/cart2">
              <FiShoppingCart className="cart" />
            </Link>
          </div>
          <div className="cartno">{qty}</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
