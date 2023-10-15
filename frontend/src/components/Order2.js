import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import "../style/order2.css";

function Order2() {
  const { id } = useParams();

  const [order, setOrder] = useState(0);
  
  const getOrderStatus = async () => {

   
    const host = process.env.REACT_APP_HOST;

    const response = await fetch(`${host}/api/order/getorder/${id}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
      headers: {
      
        auth_Token:
          localStorage.getItem('token'),
      },
    });

    //parse json response in fetchedNotes
    const fetchedOrder = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setOrder(fetchedOrder);
   
    
  };


  function scrollToTop() {
    window.scrollTo(0, 0);
  }
 
  useEffect(() => {
    getOrderStatus();
    // eslint-disable-next-line
    scrollToTop();
  }, []);






  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) {
      return "orderdone";
    } else if (index - status === 1) {
      return "orderinProgress";
    } else if (index - status > 1) {
      return "orderundone";
    }
  };

  return (
    <div className="ordercontainer">
      <div className="orderleft">
        <div className="orderrow">
          <table className="ordertable">
            <tr className="ordertrTitle">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className="ordertr">
              <td>
                <span className="orderid">{order._id}</span>
              </td>
              <td>
                <span className="ordername"> {order.customer} </span>
              </td>
              <td>
                <span className="orderaddress">{order.address} </span>
              </td>
              <td>
                <span className="ordertotal"> {order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className="orderrow">
          <div className={statusClass(0)}>
            <img src="/img/paid.png" style={{ width: 30, height: 30 }} alt="" />
            <span>Payment</span>
            <div className="ordercheckedIcon">
              <img
                className="ordercheckedIcon"
                src="/img/checked.png"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <img src="/img/bake.png" style={{ width: 30, height: 30 }} alt="" />
            <span>Preparing</span>
            <div className="ordercheckedIcon">
              <img
                className="ordercheckedIcon"
                src="/img/checked.png"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <img src="/img/bike.png" style={{ width: 30, height: 30 }} alt="" />
            <span>On the way</span>
            <div className="ordercheckedIcon">
              <img
                className="ordercheckedIcon"
                src="/img/checked.png"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <img
              src="/img/delivered.png"
              style={{ width: 30, height: 30 }}
              alt=""
            />
            <span>Delivered</span>
            <div className="ordercheckedIcon">
              <img
                className="ordercheckedIcon"
                src="/img/checked.png"
                style={{ width: 20, height: 20 }}
                alt=""
              />
            </div>
          </div>
        </div>
        
      </div>
      <div className="orderright">
        <div className="orderwrapper">
          <h2 className="ordertitle">CART TOTAL</h2>
          <div className="ordertotalText">
            <b className="ordertotalTextTitle">Subtotal:</b>₹{order.total}
          </div>
          <div className="ordertotalText">
            <b className="ordertotalTextTitle">Discount:</b>₹0.00
          </div>
          <div className="ordertotalText">
            <b className="ordertotalTextTitle">Total:</b>₹{order.total}
          </div>
          {/* <button disabled className="orderbutton">
            PAID
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Order2;
