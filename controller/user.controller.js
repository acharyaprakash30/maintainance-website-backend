const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

dotenv.config();
//creating user
const create = (req, res) => {
  if (req.file) {
    var img = req.file.filename;
  }
      const newUser = {
        email:req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        password:req.body.password,
        gender: req.body.gender,
        image:req.file ? img:null
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
            name:user.name,
            id:user.id,
            email:user.email,
            role:user.role
          },process.env.VERIFY_SEC,
          {expiresIn:'7d'},
          
          (err, token) => {
            res.status(200).json({
              messege:"Login succcessful!",
              token: token,
            });
          }
          )
        }else{

          res.status(500).json({
            messege:"Something were went wrong!"
          })
        }
      })
    }else{
      res.status(401).json({
        messege:"Invalid Credintals!"
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
  model.User.findOne({ where: { id: req.params.id } }).then((exist)=>{
    if(exist){
      const editedUser ={
        name: req.body.name,
        contact: req.body.contact,
        password:req.body.password,
        gender:req.body.gender,
        email:req.body.email,
      }
      bcrypt.hash(editedUser.password, 10, function(err, hash) {
        editedUser.password=hash;
      model.User.update(editedUser,{where:{id:req.params.id}}).then((update)=>{
        res.status(200).json({
          messege:"user updated succcessfully!",
          updated:editedUser,
        })
      }).catch(err=>{
        res.status(500).json({
          messege:"something went wrong!",err
        })
      })
    })}else{
      res.status(401).json({
        messege:"user email not found"
      })
    }
  }).catch(err=>{
    res.status(500).json({
      messege:"something went wrong!",err
    })
  })
}

//update profile
const   editProfile = (req,res)=>{
  let userId = req.userData.id;

  model.User.findOne({ where: { id: userId } })
  .then((result) => {
    if (result) {
      return res.status(200).json({
        data:result
      })
    
    } else {
      res.status(401).json({
        messege: "No user found",
      });
    }
  }).catch(err=>{
    res.status(500).json({
      messege:"something went wrong!",err
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
        messege: "Something went wrong!!",error
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
        messege: "Something went wrong!!",error
      });
    });
};

const updateRole = (req,res) => {
  const id = req.params.id;

  model.User.findByPk(id).then(result => {
    if(result){
      updatedRole ={
        role: req.body.role
      }
      model.User.update(updatedRole, {where: {id:id}} ).then(result =>{
        res.status(201).json({
          message : "User Role updated!!",
          result : updatedRole
        });
      }).catch(error => {
        res.status(501).json({
          message : "User cant be updated",
          error: error
        });
      });

    }else{
      res.status(501).json({
        message: "User with id " + id +"is not valid"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Something went wrong!!",
      error: error
    });
  });

}

module.exports = {
  create,
  login,
  editUser,
  deleteUser,
  index,
  show,
  editProfile,
  updateRole
};
