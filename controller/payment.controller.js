const model = require("../models");

//create Payment

const PaymentInput = (req, res) => {
  const Payment = {
    userId:req.userData.id,
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
  model.Payment.destroy({ where: { id:req.params.id} })
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
        messege: "Something went wrong",err
      });
    });
};

//get all lcoation
const index = (req, res) => {
  model.Payment.findAll({attributes:{
      exclude:[
          "createdAt",
          "updatedAt"
      ]
  }})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",error
      });
    });
};

//get Payment by id
const show = (req, res) => {
  const id = req.params.id;

  model.Payment.findByPk(id,{attributes:{
      exclude:[
          "createdAt",
          "updatedAt"
      ]
  }})
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
        messege: "Something went wrong!!",error
      });
    });
};

module.exports={
  PaymentInput,editPayment,deletePayment,index,show
}