import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../style/signup.css";

function Signup() {
  const navigate = useNavigate();

  

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const host = process.env.REACT_APP_HOST;

    const response = await fetch(`${host}/api/auth/createuser`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    // // parses JSON response into native JavaScript objects
    const json = await response.json();
    if (json.Success) {
      toast.success("Sign up Successfully")
      localStorage.setItem("token", json.auth_Token);
      navigate("/login2/nav");
    } else {
     
      toast.error(json.error)
    }
  };





 
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);


  return (
    <div className="logincontainer">
      
      <div className="loginwrapper">
     
        <h1>Sign Up</h1>
        <input
          placeholder="name"
          type="text"
          className="logininput"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          type="email"
          className="logininput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="text"
          className="logininput"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClick(e);}}}
        />
        <button onClick={handleClick} className="loginbutton">
          Sign Up
        </button>

       
        
        <h4 className="H5">
          Already have an account? <Link to="/login2/nav">Sign In</Link>
        </h4>
        
      </div>
    </div>
  )
}

export default Signup
