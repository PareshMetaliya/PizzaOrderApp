import React, { useEffect, useState } from "react";
import "../style/login2.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserdata } from "../redux/cartSlice";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const host = process.env.REACT_APP_HOST;

function Login2() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState();

  // const router = useRouter();

  const getUser = async (json) => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        auth_Token: localStorage.getItem("token"),
      },
    });

    //parse json response in fetchedNotes
    const fetchedUser = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setUser(fetchedUser);
    const jsonData = JSON.stringify(fetchedUser);
    
    dispatch(setUserdata(fetchedUser));

    localStorage.setItem("user",jsonData );
   
    // dispatch(setUserdata(user));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({ email: email, password: password }),
    });

    // // parses JSON response into native JavaScript objects
    const json = await response.json();

    if (json.Success) {
      localStorage.setItem("token", json.auth_Token);
      getUser(json);
      toast.success("Sign in Successfully")
      if (id === "nav") {
        navigate("/");
      }
      if (id === "cart") {
        navigate("/cart2");
      }

    } else {
     
      toast.error("Login with Valid details")
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
     
        <h1>Sign in</h1>
       
        <input
          placeholder="email"
          type="email"
          className="logininput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="logininput"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClick(e);}}}
        />
        <button onClick={handleClick} className="loginbutton">
          Sign In
        </button>

       
        {error && <span className="loginerror">Wrong Credentials!</span>}
        <h4 className="H5">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </h4>
        <div className="demo">
          <div className="demodata">
            <div>
              <h4>ADMIN:</h4>
            </div>
            <div>Email: admin@gmail.com</div>
            <div>Password: Admin</div>
          </div>
          <div>
            <div>
            
              <h4>USER: </h4>
            </div>
            <div>Email: user@gmail.com</div>
            <div>Password: User</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;
