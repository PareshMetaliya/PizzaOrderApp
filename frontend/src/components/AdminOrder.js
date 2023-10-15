import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../style/adminordes2.css";
import toast from "react-hot-toast";
import Add2 from "./Add2";
import Edit2 from "./Edit2";

function AdminOrder() {
  const { userdata } = useSelector((state) => state.cart);

  let pizzasInitial = [];
  let orderssInitial = [];
  const [pizzaList, setPizzaList] = useState(pizzasInitial);
  const [pizza, setPizza] = useState();
  const [orderList, setOrderList] = useState(orderssInitial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const status = ["payment", "preparing", "on the way", "delivered"];

  
  const host = process.env.REACT_APP_HOST;



  const getPizzas = async () => {
    const response = await fetch(`${host}/api/pizza/fetchallpizzas`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
    });

    //parse json response in fetchedNotes
    const fetchedPizzas = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setPizzaList(fetchedPizzas);
  };

  const getOrders = async () => {
    const response = await fetch(`${host}/api/order/fetchallAdminorders`, {
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${host}/api/pizza/deletepizza/${id}`, {
        // *GET, POST, PUT, DELETE, etc.
        method: "DELETE",
        headers: {
          auth_Token: localStorage.getItem("token"),
        },
      });

      //parse json response in fetchedNotes
      const deletedPizza = await response.json();

      if (deletedPizza) {
        toast.success("Deleted!");
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if (currentStatus <= 2) {
      const updatedStatus = currentStatus + 1;

     

      try {
        const response = await fetch(`${host}/api/order/updateorder/${id}`, {
          // *GET, POST, PUT, DELETE, etc.
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            auth_Token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ status: updatedStatus }),
        });

        const updatedOrder = await response.json();
        if (updatedOrder) {
          toast.success("Updated!");
          getOrders();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddPizza = () => {
    setOpen(true);
  };
  const handleEditPizza = (pizza2) => {
    setPizza(pizza2);
    setEdit(true);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
    getOrders();
    // eslint-disable-next-line
    scrollToTop();
  }, []);
  return (
    <>
      {userdata && userdata.role === "admin" ? (
        <div className="admincontainer">
          <div className="adminitem">
            <div className="adminitem2">
              <div className="hdg">
                <h1 className="admintitle">Products</h1>
                <button className="addbutton" onClick={handleAddPizza}>
                  Add Pizza
                </button>
              </div>
              {open && <Add2 setOpen={setOpen} />}
            </div>
            <table className="admintable">
              <tbody>
                <tr className="admintrTitle">
                  <th>Image</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </tbody>

              {pizzaList.map((product) => (
                <tbody key={product._id}>
                  <tr className="admintrTitle">
                    <td>
                      <img
                        src={product.image}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td>{product._id.slice(0, 5)}...</td>

                    <td>{product.title}</td>

                    <td>₹{product.prices[0]}</td>

                    <td>
                      <button
                        className="adminbutton"
                        onClick={() => {
                          handleEditPizza(product);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="adminbutton"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <div className="adminitem3">
                    {edit && <Edit2 setEdit={setEdit} product={pizza} />}
                  </div>
                </tbody>
              ))}
            </table>
          </div>
          <div className="adminitem">
            <h1 className="admintitle2">Orders</h1>
            <table className="admintable">
              <tbody>
                <tr className="admintrTitle">
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tbody>

              {orderList.map((order) => (
                <tbody key={order._id}>
                  <tr className="admintrTitle">
                    <td>{order._id.slice(0, 5)}...</td>

                    <td>{order.customer.slice(0, 10)}...</td>

                    <td>₹{order.total}</td>

                    <td>
                      {order.method === 0 ? (
                        <span>COD</span>
                      ) : (
                        <span>Online</span>
                      )}
                    </td>
                    <td>{status[order.status]}</td>

                    <td>
                      <button
                        disabled={order.status === 3}
                        onClick={() => handleStatus(order._id)}
                        className="addbutton"
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div>Not Allowed</div>
      )}
    </>
  );
}

export default AdminOrder;
