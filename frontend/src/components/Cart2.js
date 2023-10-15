import React, { useEffect, useState } from "react";
import "../style/cart2.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  reset,
} from "../redux/cartSlice";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OrderDetails2 from "./OrderDetails2";

function Cart2() {
  
  const { products, total, userdata } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [online, setOnline] = useState(false);
  const [orderId, setOerderId] = useState();

  const handleDec = (pizza) => {
    const payload = {
      id: pizza._id,
      extras: pizza.extras,
      size: pizza.size,
    };
    dispatch(decrementQuantity(payload));
  };

  const handleInc = (pizza) => {
    const payload = {
      id: pizza._id,
      extras: pizza.extras,
      size: pizza.size,
    };
    dispatch(incrementQuantity(payload));
  };

  const handleDelete = (pizza) => {
    const payload = {
      id: pizza._id,
      extras: pizza.extras,
      size: pizza.size,
    };
    dispatch(deleteProduct(payload));
    toast.success("Deleted");
  };

  const handleCheckout = () => {
   
    if (userdata) {
      setOpen(true);
    } else {
      toast.success("Sign in first");
      navigate("/login2/cart");
    }
  };

  const createOrder = async (customer, address, total, method, products) => {
   
    const host = process.env.REACT_APP_HOST;

    if (cash) {
      const response = await fetch(`${host}/api/order/addorder`, {
        // *GET, POST, PUT, DELETE, etc.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_Token: localStorage.getItem("token"),
        },

        body: JSON.stringify(customer, address, total, method, products),
      });

      const json = await response.json();

      if (json.Success) {
        dispatch(reset());
        toast.success("Order Placed Successfully");
        navigate(`/order2/${json.orderId}`);
        setCash(false);
      }
    }

    if (online) {
      const response = await fetch(`${host}/api/order/addonlineorder`, {
        // *GET, POST, PUT, DELETE, etc.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_Token: localStorage.getItem("token"),
        },

        body: JSON.stringify(customer, address, total, method, products),
      });

      const json = await response.json();
      

      if (json.Success) {
        dispatch(reset());
        navigate(`/order2/${json.orderId}`);
        setOnline(false);
      }

      

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
       
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Mom's Pizza", //your business name
        description: "Payment At Mom's Pizza",
        image: "https://example.com/your_logo",
        // order_id: `${json.orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // order_id: `${order.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        order_id: json.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function () {
          toast.success("Order Placed Successfully");
          navigate(`/order2/${json.orderId}`);
        },
        prefill: {
          name: customer,
        },

        theme: {
          color: "#E78400",
        },
        // config: {
        //   display: {
        //     hide: [
        //       {
        //         method: 'upi'
        //       }
        //     ],
        //     preferences: {
        //       show_default_blocks: true,
        //     },
        //   },
        // },
      };
      var razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="cartcontainer">
      <div className="cartleft">
        <table className="carttable">
          <tr className="carttrTitle">
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>

          {/* --------------- */}

          {products.map((pizza) => (
            <tr className="carttr" key={pizza._id}>
              <td>
                <div className="cartimgContainer">
                  <img
                  
                    src={pizza.image}
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className="cartname">{pizza.title}</span>
              </td>
              <td>
               
                <span className="cartextras">
                  {pizza.extras.map((extra) => {
                    return <span>{extra.text}, </span>;
                  })}
                </span>
              </td>
              <td>
               
                <span className="cartprice">₹{pizza.price} </span>
              </td>
              <td>
                <div className="cartqtyset">
                  <div className="dec" onClick={() => handleDec(pizza)}>
                    -
                  </div>

                  <span className="cartquantity"> {pizza.quantity}</span>

                  <div className="enc" onClick={() => handleInc(pizza)}>
                    +
                  </div>
                </div>
              </td>
              <td>
                <span className="carttotal">
                  ₹{pizza.quantity * pizza.price}
                </span>
              </td>
              <td>
                <span>
                  <AiOutlineDelete
                    onClick={() => handleDelete(pizza)}
                    className="delete"
                  />
                </span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="cartright">
        <div className="cartwrapper">
          <h2 className="carttitle">CART TOTAL</h2>
          <div className="carttotalText">
            <b className="carttotalTextTitle">Subtotal:</b>₹{total}
          </div>
          <div className="carttotalText">
            <b className="carttotalTextTitle">Discount:</b>₹0.00
          </div>
          <div className="carttotalText">
            <b className="carttotalTextTitle">Total:</b>₹{total}
          </div>

          {open ? (
            <div className="paymentMethods">
              <button className="payButton" onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>

              <button className="payButton" onClick={() => setOnline(true)}>
                ONLINE PAYMENT
              </button>
            </div>
          ) : (
            <button
              disabled={
                (userdata && userdata.role === "admin") || products.length === 0
              }
              className="cartbutton"
              onClick={() => handleCheckout()}
            >
              CHECKOUT NOW!
            </button>
          )}

          {userdata && userdata.role === "admin" ? (
            <p>Admin Not Allowed to Order.</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetails2
          createOrder={createOrder}
          setCash={setCash}
          setOnline={setOnline}
          cash={cash}
          online={online}
        />
      )}
      {online && (
        <OrderDetails2
          createOrder={createOrder}
          setOnline={setOnline}
          setCash={setCash}
          cash={cash}
          online={online}
        />
      )}
    </div>
  );
}

export default Cart2;
