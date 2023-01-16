const jwt = require("jsonwebtoken");
const { CHAR } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();


const verification = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.VERIFY_SEC);
        req.userData = decoded
        next();
    } catch (e) {
    res.status(401).json({ 
      message: "Invalid or expired token",
      error: e,
    });
  }
}

module.exports={verification}