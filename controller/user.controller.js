const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");


dotenv.config();
//creating user
const create = catchError((req, res) => {
  if (req.file) {
    var img = req.file.path;
  }
  const newUser = {
    email: req.body.email,
    name: req.body.name,
    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    image: req.file ? img : null,
  };

  if (newUser.password === req.body.confirmPassword) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
      newUser.password = hash;
      model.User.create(newUser)
        .then((result) => {
          res.status(200).json({
            newUser,
            message: "User created successful!",
          });
        })
        .catch((err) => {
          res.status(500).json({ message: "Something went wrong", err: err });
        });
    });
  } else {
    res.status(401).json({
      message: "Password doesn't match",
    });
  }
}
)
//user login
const login = catchError((req, res) => {
  model.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          // console.log("__________")
          const verify = jwt.sign(
            {
              name: user.name,
              id: user.id,
              email: user.email,
              // role: user.role,
            },
            process.env.VERIFY_SEC,
            { expiresIn: "7d" },

            (err, token) => {
              res.status(200).json({
                message: "Login succcessful!",
                token: token,
              });
            }
          );
        }
      });
    } else {
      res.status(401).json({
        message: "Invalid Credintals!",
      });
    }
  });
});

//update user
const editUser = catchError((req, res) => {
  model.User.findOne({ where: { id: req.params.id } }).then(async (exist) => {
    if (exist) {
      if (req.file) {
        let oldFileName = "";
        oldFileName = exist.image;
        if (oldFileName) {
          fs.unlinkSync(oldFileName);
        }
        var img = req.file.path;
      }
      const editedUser = {
        name: req.body.name,
        contact: req.body.contact,
        gender: req.body.gender,
        email: req.body.email,
        role: req.body.role,
        image: img,
      };

      model.User.update(editedUser, { where: { id: req.params.id } }).then(
        (update) => {
          res.status(200).json({
            message: "user updated succcessfully!",
            updated: editedUser,
          });
        }
      );
    } else {
      res.status(401).json({
        message: "user not found",
      });
    }
  });
});


//update profile
const editProfile = catchError((req, res) => {
  let userId = req.userData.id;

  model.User.findOne({ where: { id: userId } }).then((result) => {
    if (result) {
      return res.status(200).json({
        data: result,
      });
    } else {
      res.status(401).json({
        message: "No user found",
      });
    }
  });
});

//delete user
const deleteUser = catchError((req, res) => {
  model.User.destroy({ where: { email: req.body.email } }).then((result) => {
    if (result) {
      res.status(200).json({
        message: `User  deleted`,
      });
    } else {
      res.status(404).json({
        message: `User not found`,
      });
    }
  });
});

//get all user
const index = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;

  model.User.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          contact: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
  }).then((result) => {
    res.status(200).json({
      data: result.rows,
    });
  });
});



//get user by id
const show = catchError((req, res) => {
  const id = req.params.id;

  model.User.findByPk(id).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Id not found",
      });
    }
  });
});

const updateRole = catchError((req, res) => {
  const id = req.params.id;

  model.User.findByPk(id).then((result) => {
    if (result) {
      updatedRole = {
        role: req.body.role,
      };
      model.User.update(updatedRole, { where: { id: id } }).then((re7silult) => {
        res.status(201).json({
          message: "User Role updated!!",
          result: updatedRole,
        });
      });
    } else {
      res.status(501).json({
        message: "User with id " + id + "is not valid",
      });
    }
  });
});

module.exports = {
  create,
  login,
  editUser,
  deleteUser,
  index,
  show,
  editProfile,
  updateRole,
};
