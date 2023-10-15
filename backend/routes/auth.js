const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//JWT signature for generation of auth_Token, 

const jwtSign = process.env.JWT_SIGN;

let Success= false;

//Route1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    //express-validator----------
    // email must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password Must be a 4 char").isLength({ min: 4 }),
    // name must be at least 3 chars long
    body("name", "Name Must be a 3 char").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // from express-validator : https://express-validator.github.io/docs/6.12.0/

      //check weather user with same email id available..
      //   GET USER FROM MONGOOSE METHOD OF findOne()
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "user with same email id exists" });
      }

      // Using bcryptjs salt and hash method to secure password
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // save data in mongoDB and create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      // JWT token generation
      // sending MongoDB id as a token data
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_Token = jwt.sign(data, jwtSign);
      
      let Success=true;
      res.json({ Success, auth_Token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    //express-validator----------
    // email must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password",).exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Get Login details from the body
    const { email, password } = req.body;

    try {
      //check login details matched with the DB data or not
      let user = await User.findOne({ email });
      //if email id login person add not matched with the DB data than throw error
      if (!user) {
        return res.status(400).json({ errors: "Login with correct data" });
      }

      //If email id matched than go ahead
      // Now compare password

      const passwordCompare = await bcrypt.compare(password, user.password);

      //If password not matched
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Login with correct data" });
      }
      //If password matched
      // sending MongoDB id as a token data
      const data = {
        user: {
          id: user.id,
          role: user.role
        },
      };
      const auth_Token = jwt.sign(data, jwtSign);
     
      let Success=true;
      res.json({Success, auth_Token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route3: Get a User detail: POST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser,async (req, res) => {
  try {
//If fetchuser middleware run than Put user id that we have get from the Req.Header and we have save it in req.user in fetcheuser function
  // Getting only ide from req.user as we have send token in formate of{userId}     
    const userId =req.user.id;
    //take user from DB using The ID
    const user = await User.findById(userId).select("-password")
    res.send(user);
    // res.send(user.role);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
}
);

module.exports = router;