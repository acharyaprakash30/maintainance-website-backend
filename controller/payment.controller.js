const { catchError } = require("../middleware/catchError");
const model = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");


//create Payment

const PaymentInput = catchError((req, res) => {
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
    
});

//edit Payment

const editPayment = catchError((req, res) => {
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
          
      } else {
        res.status(401).json({
          messege: "No Payment found",
        });
      }
    })
    
});
//delete

const deletePayment = catchError((req, res) => {
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

});

//get all lcoation
const index = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  model.Payment.findAndCountAll(
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
        data:result.rows
      });
    })
    
});

//get Payment by id
const show = catchError((req, res) => {
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
    
});

module.exports = {
  PaymentInput,
  editPayment,
  deletePayment,
  index,
  show,
};
