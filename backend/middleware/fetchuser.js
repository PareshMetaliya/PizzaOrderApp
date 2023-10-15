const jwt = require("jsonwebtoken");
//JWT signature for generation of auth_Token, 


const jwtSign = process.env.JWT_SIGN;

fetchuser = (req, res, next) => {
  //Get the user from the JWT token and id to req object

  //get the token from the headed file
  const token = req.header("auth_Token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate with valid token" });
  }
  try {
    // Put a JWT data in "const data"
    // In JWT data is in formate ob object {user {id:***}  }
    const data = jwt.verify(token, jwtSign);
// Give only user object to req.user
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with valid token" });
  }
};

module.exports = fetchuser;
