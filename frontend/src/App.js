import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import PizzaList2 from "./components/PizzaList2";
import Footer2 from "./components/Footer2";
import Product2 from "./components/Product2";
import Order2 from "./components/Order2";
import Cart2 from "./components/Cart2";
import Add2 from "./components/Add2";
import OrderDetails2 from "./components/OrderDetails2";
import AdminOrder from "./components/AdminOrder";
import Login2 from "./components/Login2";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import UserOrder from "./components/UserOrder";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/pizzaList2" element={<PizzaList2 />} />
          <Route path="/product2/:id" element={<Product2 />} />
          <Route path="/order2/:id" element={<Order2 />} />
          <Route path="/cart2" element={<Cart2 />} />
          <Route path="/add2" element={<Add2 />} />
          <Route path="/odt" element={<OrderDetails2 />} />
          <Route path="/admin" element={<AdminOrder />} />
          <Route path="/login2/:id" element={<Login2 />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/userorder" element={<UserOrder />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>
      <div>
        <Toaster />
      </div>
      <Footer2 />
    </>
  );
}

export default App;
