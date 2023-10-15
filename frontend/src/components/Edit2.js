import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import toast from "react-hot-toast";
import "../style/add2.css";

function Edit2({ setEdit, product }) {
  const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;

  const cld = new Cloudinary({ cloud: { cloudName: cloudinaryCloudName } });

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);
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
      const newProduct = {
        title,
        description,
        prices,
        extraOptions,
        // image: Imgurl,
      };

      const host = process.env.REACT_APP_HOST;

      const updatePizza = await fetch(`${host}/api/pizza/updatepizza/${product._id}`, {
        // *GET, POST, PUT, DELETE, etc.
        method: "PUT",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
          auth_Token: localStorage.getItem("token"),
        },

       
        body: JSON.stringify(newProduct),
      });

      // // parses JSON response into native JavaScript objects
      const json = await updatePizza.json();

      if (json.Success) {
        setEdit(false);
        toast.success("Updated Succesfully!");
        
      }
      // ----------------------------------------
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setEdit(false);
  };

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="addcontainer">
      <div className="addwrapper">
        <span onClick={handleClose} className="addclose">
          X
        </span>
        <h1>Edit Pizza</h1>
        <div className="additem">
         
        </div>
        <div className="additem">
          <label className="addlabel">Title</label>
          <input
            className="addinput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="additem">
          <label className="addlabel">Description</label>
          <textarea
            rows={4}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="additem">
          <label className="addlabel">Prices</label>
          <div className="addpriceContainer">
            <input
             
              className="addinput addinputSm"
              type="number"
              placeholder={`Small ${prices[0]}`}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              
              className="addinput addinputSm"
              type="number"
              placeholder={`Medium ${prices[1]}`}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              
              className="addinput addinputSm"
              type="number"
              placeholder={`Large ${prices[2]}`}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="additem">
          <label className="addlabel">Extra</label>
          <div className="addextra">
            {extraOptions.map((option) => (
              <div key={option.text}>
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
              </div>
            ))}

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
          Update
        </button>
      </div>
    </div>
  );
}

export default Edit2;
