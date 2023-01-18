const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs")
const {Service} = model

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")

dotenv.config();
//creating user
const create = (req, res) => {
  const newUser = {
    email:req.body.email,
    name: req.body.name,
    contact: req.body.contact,
    password:req.body.password,
    gender: req.body.gender,
  };

  if(newUser.password === req.body.confirmPassword){
    bcrypt.hash(newUser.password, 10, function(err, hash) {
      newUser.password=hash;
      model.User.findOne({where:{email:newUser.email}}).then((exist)=>{
        if(exist){
          res.status(200).json({
           messege: "Email already taken ",
         });
        }else{
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
        }
      }).catch(err=>{
        res.status(500).json({ messege: "Something went wrong", err: err });
      })
  });
  }else{
    res.status(401).json({
          messege: "Password doesn't match",
        });
  }
  }

//user login
const login = (req, res) => {
  model.User.findOne({ where: { email: req.body.email } })
  .then((user) => {
    if(user){
      bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
          
          const verify = jwt.sign(
            {
            user:user.name,
            id:user.id
          },process.env.VERIFY_SEC,
          (err, token) => {
            res.status(200).json({
              messege:"Login succcessful!",
              token: token,
            });
          }
          )
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

//update user
const editUser = (req,res)=>{
  model.User.findOne({ where: { email: req.body.email } }).then((exist)=>{
    if(exist){
      const editedUser ={
        name: req.body.name,
        contact: req.body.contact,
        password:req.body.password,
      }
      bcrypt.hash(editedUser.password, 10, function(err, hash) {
        editedUser.password=hash;
      model.User.update(editedUser,{where:{email:req.body.email}}).then((update)=>{
        res.status(200).json({
          messege:"user updated succcessfully!",
          updated:editedUser,
        })
      }).catch(err=>{
        res.status(500).json({
          messege:"something went wrong!"
        })
      })
    })}else{
      res.status(401).json({
        messege:"user email not found"
      })
    }
  }).catch(err=>{
    res.status(500).json({
      messege:"something went wrong!"
    })
  })
}

//delete user
const deleteUser = (req, res) => {
  model.User.destroy({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `User  deleted`,
        });
      } else {
        res.status(404).json({
          messege: `User not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
      });
    });
};

//get all user
const index = (req, res) => {
  model.User.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};

//get user by id
const show = (req, res) => {
  const id = req.params.id;

  model.User.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          messege: "Id not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};


//get userServices by id
const getUserSerivceById =async (req, res) => {
  const findUser =await model.User.findOne({
    attributes:{
      exclude:[
        "contact",
        "password",
        "gender",
      "createdAt",
      "IsAdmin",
      "updatedAt"]
    },
    include: {
      model: Service,
      as: "Service",
      attributes:{
        exclude:["userId",
        "createdAt",
        "updatedAt"]
      },
    },where:{id:req.userData.id}
  });
  if (findUser) {
    res.status(200).json({
      message: "Successfully found!!",
      result:findUser
    });
  } else {
    res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};



module.exports = {
  create,
  login,
  editUser,
  deleteUser,
  index,
  show,
  getUserSerivceById

};
