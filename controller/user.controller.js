const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");

dotenv.config();
//creating user
const create = (req, res) => {
  const newUser = {
    name: req.body.name,
    contact: req.body.contact,
    password:req.body.password,
    gender: req.body.gender,
  };
  if(req.body.password === req.body.confirmPassword){
    bcrypt.hash(newUser.password, 10, function(err, hash) {
      newUser.password=hash;
      model.User.create(newUser)
        .then((result) => {
          res.status(200).json({
             newUser,
            messege: "User created successful!",
          });
        })
        .catch((err) => {
          res.status(500).json({ messege: "Something went wrong", err: err });
        });
  });
  }else{
    res.status(401).json({
          messege: "Password doesn't match",
        });
  }
  }

//user login
const login = (req, res) => {
  model.User.findOne({ where: { name: req.body.name } })
  .then((user) => {
    if(user){
      bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
          res.status(200).json({
            messege:"Login succcessful!"
          })
        }else{
          res.status(401).json({
            messege:"Invalid password!"
          })
        }
      })
    }else{
      res.status(401).json({
        messege:"User not found!"
      })
    }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong",
        error
      });
    });
};

module.exports = {
  create,
  login,
};
