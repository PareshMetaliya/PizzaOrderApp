import React, { useEffect, useState } from "react";
import "../style/userorder.css";

import { useNavigate } from "react-router-dom";

function UserOrder() {
  let ordersInitial = [];
  const products = [];

  const navigate = useNavigate();

  const [orderList, setOrderList] = useState(ordersInitial);

  const getOrders = async () => {
    const host = process.env.REACT_APP_HOST;

    const response = await fetch(`${host}/api/order/fetchallorders`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
      headers: {
        auth_Token: localStorage.getItem("token"),
      },
    });

    //parse json response in fetchedNotes
    const fetchedOrders = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setOrderList(fetchedOrders);
  };

  const handleStatus = (id) => {
    navigate(`/order2/${id}`);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
    getOrders();
  }, []);

  return (
    <div>
      <div className="userContainer">
        <div>
          {orderList.map((order) => (
            <div className="userWrapper">
              <div className="heading">
                <div> Order Id:{order._id} </div>

                <button
                  className="statusBtn"
                  onClick={() => {
                    handleStatus(order._id);
                  }}
                >
                  Check Status{" "}
                </button>
              </div>
              <div className="orderUserleft">
                <table className="orderUsertable">
                  <tr className="orderUsertrTitle">
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>

                  {order.products.map((pizza) => (
                    <tr className="orderUsertr" key={pizza._id}>
                      <td>
                        <div className="orderUserimgContainer">
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
                        <span className="orderUsername">{pizza.title}</span>
                      </td>
                      <td>
                        <span className="orderUserextras">
                          {pizza.extras.map((extra) => {
                            return <span>{extra.text}, </span>;
                          })}
                        </span>
                      </td>
                      <td>
                        <span className="orderUserprice">₹{pizza.price} </span>
                      </td>
                      <td>
                        <div className="orderUserqtyset">
                          <span className="orderUserquantity">
                            {pizza.quantity}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="orderUsertotal">
                          ₹{pizza.quantity * pizza.price}
                        </span>
                      </td>
                    </tr>
                  ))}
                </table>
                <div className="subTotal">Sub Total: ₹{order.total}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
