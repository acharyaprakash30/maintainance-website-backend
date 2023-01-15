const model = require("../models");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const { body, validationResult } = require("express-validator");

dotenv.config();
//creating user
const create = (req, res) => {
  const newUser = {
    name: req.body.name,
    contact: req.body.contact,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    gender: req.body.gender,
  };
  model.User.create(newUser)
    .then((result) => {
      res.status(200).json({
        result: newUser,
        messege: "User created successful!",
      });
    })
    .catch((err) => {
      res.status(500).json({ messege: "Something went wrong", err: err });
    });
};

//user login
const login = (req, res) => {
  model.User.findOne({ where: { name: req.body.name } })
    .then((user) => {
        if(user){
            const decrypted = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
            if(req.body.password === decrypted){
                res.status(200).json({
                    messege:"Login Successful"
                })
            }else{
                res.status(401).json({
                    messege:"Password doesn't match"
                })
            }
        }else{
            res.status(401).json({
                messege:"User not found"
            })
        }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong",
      });
    });
};

module.exports = {
  create,
  login,
};
