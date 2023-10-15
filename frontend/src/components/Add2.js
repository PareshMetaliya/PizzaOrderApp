import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import toast from "react-hot-toast";
import "../style/add2.css";

function Add2({ setOpen }) {
  const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;

  const cld = new Cloudinary({ cloud: { cloudName: cloudinaryCloudName } });
 
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
   

    data.append("api_key", apiKey);
   

    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
      

      const response = await fetch(url, {
        method: "POST",
        body: data, // Assuming 'data' contains the data you want to send
        // You may need to set appropriate headers based on your API requirements
      });

      const uploadRes = await response.json(); // Parse the JSON response

      const Imgurl = uploadRes.secure_url;
      const newProduct = {
        title,
        description,
        prices,
        extraOptions,
        image: Imgurl,
      };

     

      const host = process.env.REACT_APP_HOST;

      const addPizza = await fetch(`${host}/api/pizza/addpizza`, {
        // *GET, POST, PUT, DELETE, etc.
        method: "POST",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
          auth_Token: localStorage.getItem("token"),
        },

       
        body: JSON.stringify(newProduct),
      });

      // // parses JSON response into native JavaScript objects
      const json = await addPizza.json();

      if (json.Success) {
        setOpen(false);
        toast.success("Added Succesfully!");
      }
      // ----------------------------------------
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="addcontainer">
      <div className="addwrapper">
        <span onClick={handleClose} className="addclose">
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className="additem">
          <label className="addlabel">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="additem">
          <label className="addlabel">Title</label>
          <input
            className="addinput"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="additem">
          <label className="addlabel">Description</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="additem">
          <label className="addlabel">Prices</label>
          <div className="addpriceContainer">
            <input
              
              className="addinput addinputSm"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              
              className="addinput addinputSm"
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
             
              className="addinput addinputSm"
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="additem">
          <label className="addlabel">Extra</label>
          <div className="addextra">
            <input
             
              className="addinput addinputSm"
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
             
              className="addinput addinputSm"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className="addextraButton" onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className="addextraItems">
            {extraOptions.map((option) => (
              <span key={option.text} className="addextraItem">
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className="addaddButton" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Add2;
