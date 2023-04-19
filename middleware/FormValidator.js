const { check, validationResult } = require("express-validator");
const models = require("../models");
const fs = require("fs");

exports.validateUser = [
  check("name")
    .notEmpty()
    .withMessage("Full name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("email")
    .notEmpty()
    .withMessage("Email is required!!")
    .custom((email, { req }) => {
      if (req.params.id) {
        const userId = req.params.id;
        return models.User.findOne({ where: { id: userId } }).then(
          (checkdata) => {
            if (email == checkdata.email) {
            } else {
              return models.User.findOne({ where: { email: email } }).then(
                (userdata) => {
                  if (userdata) {
                    throw "Email already exists!!";
                  }
                }
              );
            }
          }
        );
      } else {
        return models.User.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            throw "Email already exists!!";
          }
        });
      }
    })
    .isEmail()
    .withMessage("Invalid email address!!"),

  check("password")
    .notEmpty()
    .withMessage("Password is required!!")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one special character"
    ),

  check("contact")
    .notEmpty()
    .withMessage("Mobile number is required!!")
    .custom((contact, { req }) => {
      if (req.params.id) {
        const user_Id = req.params.id;
        return models.User.findOne({ where: { id: user_Id } }).then(
          (checkdata) => {
            if (contact == checkdata.contact) {
            } else {
              return models.User.findOne({
                where: { contact: contact },
              }).then((result) => {
                if (result) {
                  throw "contact is already registered!!";
                }
              });
            }
          }
        );
      } else {
        return models.User.findOne({
          where: { contact: contact },
        }).then((result) => {
          if (result) {
            throw "contact is already registered!!";
          }
        });
      }
    })
    .matches("^([9][0-9]{9})$")
    .withMessage("Please enter valid contact!!"),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required!!")
    .isIn(["Male", "Female", "Others"])
    .withMessage("Please provide valid Gender!!"),
  

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateCategory = [
  check("CategoryName")
    .notEmpty()
    .withMessage("category name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid category name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];


exports.validateService = [
  check("name")
    .notEmpty()
    .withMessage("service name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("slug")
    .notEmpty()
    .withMessage("service slug is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid slug!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("categoryId")
    .notEmpty()
    .withMessage("category id is required!!"),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];


exports.validateFiscalYear = [
  check("year")
    .notEmpty()
    .withMessage("category id is required!!"),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];


exports.validateStore = [
  check("name")
    .notEmpty()
    .withMessage("store name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("latitude")
    .notEmpty()
    .withMessage("latitude is required!!"),
  check("longitude")
    .notEmpty()
    .withMessage("longitude is required!!"),
  check("address")
    .notEmpty()
    .withMessage("address is required!!"),
    check("contactNumber")
    .notEmpty()
    .withMessage("contact number is required!!")
    .matches("^([9][0-9]{9})$")
    .withMessage("Please enter valid contact!!"),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];


exports.validateServiceType = [
  check("name")
    .notEmpty()
    .withMessage("store name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("serviceId")
    .notEmpty()
    .withMessage("service id is required!!"),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];