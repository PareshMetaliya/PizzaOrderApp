const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Pizzas = require("../models/Pizza");
const { body, validationResult } = require("express-validator");


let Success = false;
//Route1: Fetchall Pizzas using: GET "/api/pizza/fetchallpizzas". Login  not required
router.get("/fetchallpizzas", async (req, res) => {
  try {
    
    
    const pizza = await Pizzas.find();
    res.json(pizza);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route1-A: Fetch Pizza using Id: GET "/api/pizza/getpizza/:id". Login  not required
router.get("/getpizza/:id", async (req, res) => {
  try {
    
    
    const pizza = await Pizzas.findById(req.params.id);
    if (!pizza) {
      return res.status(404).send("Not Found");
    }
    res.json(pizza);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route2:Add Pizzas of Admin using: POST "/api/pizza/addpizza". Login required
router.post(
  "/addpizza",
  fetchuser,
  [
    // title must be at least 3 chars long
    body("title", "title Must be a 3 char").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("description", "description Must be a 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Take a note data from body and destructure it
      const { title, description, image,prices,extraOptions } = req.body;

      //put all destructred data from the body to the schema of DB Pizzas
      //Pizzas is import schema from Pizzas Models & save that schema in"pizza name const
      const pizza = new Pizzas({ title, description, image,prices,extraOptions, user: req.user.id });

      //save the pizza to DB
      //pizza.save as we have save a schema to the note name
      const savedPizza = await pizza.save();

    //   res.json(savedPizza._id);
    let Success=true;
      res.json({Success,savedPizza});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route3:Update Pizzas of Admin using: Put "api/pizza/updatepizza/:id". Login required
router.put(
  "/updatepizza/:id",
  fetchuser,

  async (req, res) => {
    try {
      // Take a note data from body and destructure it
      const { title, description, image,prices,extraOptions } = req.body;

      //creater a newPizza for update a data in it
      const newPizza = {};

      //update a newPizza object using a data that we have get from body using a destructuring of it from req.body
      if (title) {
        newPizza.title = title;
      }
      if (description) {
        newPizza.description = description;
      }
      if (image) {
        newPizza.image = image;
      }

      if (prices) {
        newPizza.prices = prices;
      }
      if (extraOptions) {
        newPizza.extraOptions = extraOptions;
      }




      //Find the pizza to be updated using a id of it that is passed in api :id param
      const pizza = await Pizzas.findById(req.params.id);
      if (!pizza) {
        return res.status(404).send("Not Found");
      }

      //If pizza found than again validate a user login data id with pizza user id
      //pizza is a saved pizza from the DB, so user id is saved in User:***, and we get user id from fetchuser middleware using req.user.id from header data
      //match both id for authentication
      if (pizza.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than update a pizza with newPizza object which one is get data from body and save in updatedPizza
      const updatedPizza = await Pizzas.findByIdAndUpdate(
        req.params.id,
        { $set: newPizza },
        { new: true }
      );
let Success = true;
      res.json({Success,updatedPizza});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route4:Delete Pizzas of Admin using: Delete "/api/pizza/deletepizza/:id". Login required
router.delete(
  "/deletepizza/:id",
  fetchuser,

  async (req, res) => {
    try {
      //Find the pizza to be needed to delete using a id of it that is passed in api :id param
      const pizza = await Pizzas.findById(req.params.id);
      if (!pizza) {
        return res.status(404).send("Not Found");
      }

      //If pizza found than again validate a user login data id with pizza user id
      //pizza is a saved pizza from the DB, so user id is saved in User:***, and we get user id from fetchuser middleware using req.user.id from header data
      //match both id for authentication
      if (pizza.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than delete a pizza with id
      const updatedPizza = await Pizzas.findByIdAndDelete(req.params.id);
let Success=true;
      res.json(Success);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
