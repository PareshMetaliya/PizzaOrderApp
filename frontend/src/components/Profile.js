import React, { useEffect } from "react";
import "../style/profile.css";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { logoutUserdata } from "../redux/cartSlice";
import toast from 'react-hot-toast';

const Profile = () => {
  const user = useSelector((state) => state.cart.userdata);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserdata());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Log Out Successfully")
  };

  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <section className="profile">
      <main>
        <motion.img
          src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1696387955~exp=1696388555~hmac=acb4ac4cbe508a2f0866077b02bf50a4976b7b8ef3d987c37cace8b02259c59d"
          alt="User"
          {...options}
        />
        <motion.h5 {...options} transition={{ delay: 0.5 }}>
          {user.name}
        </motion.h5>
        {user.role === "admin" ? (
          <motion.div {...options} transition={{ delay: 0.7 }}>
            <Link
              to="/admin"
              style={{
                borderRadius: 0,
                backgroundColor: "rgb(40,40,40)",
              }}
            >
              <MdDashboard />
              ADMIN Dashboard
            </Link>
          </motion.div>
        ) : (
          <div className="na"></div>
        )}


{user.role === "user" ? (
        <motion.div
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <Link to="/userorder">Orders</Link>
        </motion.div>
 ) : (
  <div className="na"></div>
)}
        

        <motion.button
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </main>
    </section>
  );
};

export default Profile;
