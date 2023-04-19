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
      .exists()
      .withMessage("email is required")
      .custom((email, { req }) => {
        return models.User.findOne({ where: { email: email } }).then(
          (userdata) => {
            if (userdata) {
              return Promise.reject("Email already exists!!");
            }
          }
        );
      })
      .isEmail()
      .withMessage("email not valid"),
  
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
        return res.status(422).json({  validation_errors:errors.array() });
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
  check("userId")
    .notEmpty()
    .withMessage("user id is required!!"),
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
  check("userId")
    .notEmpty()
    .withMessage("user id is required!!"),

    check("contact")
    .notEmpty()
    .withMessage("Mobile number is required!!")
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