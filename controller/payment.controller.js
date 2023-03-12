const model = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");


//create Payment

const PaymentInput = (req, res) => {
  const Payment = {
    userId: req.userData.id,
    payment_type: req.body.payment_type,
    payment_method: req.body.payment_method,
  };
  model.Payment.create(Payment)
    .then((Result) => {
      res.status(200).json({
        message: "Payment added successfully",
        result: Payment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        err,
      });
    });
};

//edit Payment

const editPayment = (req, res) => {
  const editedPayment = {
    payment_type: req.body.payment_type,
    payment_method: req.body.payment_method,
  };
  model.Payment.findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        model.Payment.update(editedPayment, {
          where: { id: req.params.id },
        })
          .then((update) => {
            res.status(200).json({
              messege: "Payment updated succcessfully!",
              editedPayment,
            });
          })
          .catch((err) => {
            res.status(500).json({
              messege: "something went wrong!",
            });
          });
      } else {
        res.status(401).json({
          messege: "No Payment found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "something went wrong!",
        err,
      });
    });
};
//delete

const deletePayment = (req, res) => {
  model.Payment.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `Payment ${req.params.id} deleted`,
        });
      } else {
        res.status(404).json({
          messege: `Payment not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
        err,
      });
    });
};

//get all lcoation
const index = (req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  model.Payment.model.Payment.findAndCountAll(
    { limit,
      offset,     where: {
        [Op.or]: [
          {
            userId: {
              [Op.like]: "%" + filter + "%",
            },
          },
          {
            payment_type: {
              [Op.like]: "%" + filter + "%",
            },
          },
          {
            payment_method: {
              [Op.like]: "%" + filter + "%",
            },
          },
        ],
      },},{
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((result) => {
      res.status(200).json({
        data:PaginationData.getPagingData(result,page,limit)
      });
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//get Payment by id
const show = (req, res) => {
  const id = req.params.id;

  model.Payment.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          messege: "Payment not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

module.exports = {
  PaymentInput,
  editPayment,
  deletePayment,
  index,
  show,
};
