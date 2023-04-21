const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");
const nodemailer = require("nodemailer")
const {SMTP_MAIL,SMTP_PWD} = process.env


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


//forget password

const forgetPassword =catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await model.User.findOne({ where: { email:email } });

  if (!user) {
    return res.status(404).json({
      message: `Sorry!, The email address ${
        req.body.email
      } is not associated with any account. Verify your email address and try again.`,
    });
  }

  const token = jwt.sign(
    { email: email },
    process.env.MAIL_SEC,
    { expiresIn: '150s' },
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth: {
           user: process.env.SMTP_MAIL,
           pass: process.env.SMTP_PWD,
    }
  });

  const subject = 'Password change request';
  const to = email;
  const from = SMTP_MAIL;
  // const link = http://localhost:8000/resetpassword/${token};
  const html = `<p>Hi ${user.name},</p>
                  <p>Please click on the following <a href=http://localhost:8000/resetpassword/${token}>link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  const info = await  
  // sendMail(req.body.email,mailSubject,content)
  transporter.sendMail({
    to, from, subject, html,
  });



  if (info) {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
  }

  return res.status(200).json({
    message:
      `An email has been sent to ${
        email
      } with further instructions.`,
  });
});


//resetpasswored

const resetPassword = catchError(async (req, res, next) => {
  const { token } = req.params;

  const user = await model.User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      [Op.gt]: Date.now(),
    },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Password reset token is invalid or has expired.',
    });
  }

  if (req.body.password === req.body.confirmPassword) {
    user.password = bcrypt.hashSync(req.body.password, 11);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PWD,
      },
    });

    const subject = 'Your password has been changed';
    const to = user.email;
    const from = process.env.SMTP_MAIL;
    const html = `<p>Hi ${user.name},</p>
                  <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`;

    await transporter.sendMail({
      to, from, subject, html,
    });

    return res.status(200).json({
      message: 'Your password has been updated!!',
    });
  }
  return res.status(400).json({
    message: 'Password does not match!!',
  });
});


const changePassword = catchError(async (req, res, next) => {
  const id = req.params.id;
  // const passwordDetails = {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
  // };

  if (confirmPassword !== newPassword) {
    res.status(401).json({ message: 'Password Not Matched!' });
  } else {
    const user = await model.User.findByPk(id);
    const checkPassword = user.password;
    const passwordIsValid = bcrypt.compareSync(
      oldPassword,
      checkPassword,
    );

    if (!passwordIsValid) {
      res.status(400).json({ message: 'Incorrect Password!!' });
    } else {
      const hashedPassword = bcrypt.hashSync(newPassword, 11);

      await model.User.update(
        { password: hashedPassword },
        { where: { id: id } },
      );

      res.status(200).json({ message: 'Password Changed Successfully!' });
    }
  }
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
  forgetPassword,
  resetPassword,
  changePassword
};
