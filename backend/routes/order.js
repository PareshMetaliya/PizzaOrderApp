const express = require("express");
const router = express.Router();
const Orders = require("../models/Order");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");

let Success = false;
//Route1: Fetchall Order using: GET "/api/order/fetchallorders". Login required
router.get("/fetchallorders", fetchuser, async (req, res) => {
  try {
    //If fetcheuser middle ware run correctly than fetch all orders of that user from Order collecction
    //Orders.find is a method of moongose to get data from DB and Orders is a schema model import
    const order = await Orders.find({ user: req.user.id });

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route2:Add Order of user using: POST "/api/order/addorder". Login required
router.post(
  "/addorder",
  fetchuser,
  [
    // title must be at least 3 chars long
    body("customer", "title Must be a 3 char").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("address", "description Must be a 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.status(400).send("Some Error Occured");
    }

    try {
      // Take a order data from body and destructure it
      const {
        customer,
        address,
        total,
        status,
        method,
        deliveredAt,
        products,
      } = req.body;

      //put all destructred data from the body to the schema of DB Orders
      //Orders is import schema from Order Models & save that schema in"order name const
      const order = new Orders({
        customer,
        address,
        total,
        status,
        method,
        deliveredAt,
        products,
        user: req.user.id,
      });

      //save the order to DB
      //order.save as we have save a schema to the order name
      const savedOrder = await order.save();
      const orderId = savedOrder._id;
      let Success = true;
      res.json({ Success, orderId });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route3:Get Order of user using id: Get :"api/order/getorder/:id". Login required
router.get(
  "/getorder/:id",
  fetchuser,

  async (req, res) => {
    try {
      //Find the order to be updated using a id of it that is passed in api :id param
      const order = await Orders.findById(req.params.id);
      if (!order) {
        return res.status(404).send("Not Found");
      }

      //If order found than again validate a user login data id with order id
      //order is a saved order from the DB, so user id is saved in User:***, and we get user id from fetchuser middleware using req.user.id from header data
      //match both id for authentication
      if (order.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than show order with Order object which one is get data from body and save in getOrder
      const getOrder = await Orders.findById(req.params.id);

      res.json(getOrder);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route4:Update Order Status of Admin using: Put "api/order/updateorder/:id". Admin Login required
router.put(
  "/updateorder/:id",
  fetchuser,

  async (req, res) => {
    try {
      // Take a Order data from body and destructure it
      const { status } = req.body;

      //creater a newOrder for update a data in it
      const newOrder = {};

      //update a newOrder object using a data that we have get from body using a destructuring of it from req.body
      if (status) {
        newOrder.status = status;
      }

      //Find the order to be updated using a id of it that is passed in api :id param
      const order = await Orders.findById(req.params.id);
      if (!order) {
        return res.status(404).send("Not Found");
      }

      //If order found than again validate a user login is Admin by using role

      if (req.user.role !== "admin") {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than update a order with newOrder object which one is get data from body and save in updatedOrder
      const updatedOrder = await Orders.findByIdAndUpdate(
        req.params.id,
        { $set: newOrder },
        { new: true }
      );
      let Success = true;
      res.json(Success);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured at here");
    }
  }
);

//Route5:Delete Order of Admin using: Delete "/api/order/deleteorder/:id". Admin Login required
router.delete(
  "/deleteorder/:id",
  fetchuser,

  async (req, res) => {
    try {
      //Find the order to be needed to delete using a id of it that is passed in api re :id param
      const order = await Orders.findById(req.params.id);
      if (!order) {
        return res.status(404).send("Not Found");
      }

      //If order found than again validate a user login is Admin by using role

      if (req.user.role !== "admin") {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than delete a order with id
      const updatedOrder = await Orders.findByIdAndDelete(req.params.id);

      res.json({ Success: "Order has been Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route6:Fetch all User Order Status of Admin using: Get "api/order/fetchallAdminorders". Admin Login required
router.get(
  "/fetchallAdminorders",
  fetchuser,

  async (req, res) => {
    try {
      //Find the order to be updated using a id of it that is passed in api :id param
      const order = await Orders.find();
      if (!order) {
        return res.status(404).send("Not Found");
      }

      //If order found than again validate a user login is Admin by using role

      if (req.user.role !== "admin") {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than update a order with object which one is get data from DB and save in fetchedAllOrder
      const fetchedAllOrder = await Orders.find();

      res.json(fetchedAllOrder);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured at here");
    }
  }
);

//Route7:Create Order with razorpay: Get "api/order/fetchallAdminorders". Admin Login required

// router.post('/create-order', async (req, res) => {

//   const options = {
//       amount: 1000, // Amount in paise (100 paise = 1 INR)
//       currency: 'INR',
//       receipt: 'order_receipt',
//       payment_capture: 1, // Automatically capture payment
//   };

//   try {
//       const order = await razorpay.orders.create(options);
//       res.json(order);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while creating the order.' });
//   }
// });

// -------------------------------------------------------------------------

//Route7-A:Razorpay Order: POST "/api/order/addorder". Login required

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post(
  "/addonlineorder",
  fetchuser,
  [
    // title must be at least 3 chars long
    body("customer", "title Must be a 3 char").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("address", "description Must be a 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.status(400).send("Some Error Occured");
    }

    try {
      // Take a order data from body and destructure it
      const {
        customer,
        address,
        total,
        status,
        method,
        deliveredAt,
        products,
      } = req.body;

      //put all destructred data from the body to the schema of DB Orders
      //Orders is import schema from Order Models & save that schema in"order name const
      const order = new Orders({
        customer,
        address,
        total,
        status,
        method,
        deliveredAt,
        products,
        user: req.user.id,
      });

      //save the order to DB
      //order.save as we have save a schema to the order name
      const savedOrder = await order.save();
      const orderId = savedOrder._id;

      // ----------------------------------------------------------
      // Razorpay order post

      const options = {
        amount: total * 100, // Amount in paise (100 paise = 1 INR)
        currency: "INR",
        receipt: "order_receipt",
        payment_capture: 1, // Automatically capture payment
      };

      const razorpayorder = await razorpay.orders.create(options);
      const razorpayOrderId = razorpayorder.id;

      // -------------------------------------------------------------------

      let Success = true;
      res.json({ Success, orderId, razorpayOrderId });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
