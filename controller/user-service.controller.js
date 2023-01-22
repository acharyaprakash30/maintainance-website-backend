const model = require("../models");
const service = require("../models/service");
const { Service, Location, Payment } = model;

//create userservice
const createUserService = (req, res) => {
  const user_id = req.userData.id;
  model.User.findByPk(user_id, {
    include: [
      {
        model: Service,
        as: "Service",
        required: false,
        attributes: ["id"],
      },
      {
        model: Payment,
        as: "Payment",
        required: false,
        attributes: ["id"],
      },
    ],
  })
    .then((user) => {
      if (user) {
        const userService = {
          user_id,
          service_id: user.Service[0].id,
          payment_id: user.Payment.id,
        };
        model.userService
          .create(userService)
          .then((result) => {
            res.status(200).json({
              message: "Successfully created!!",
              result: userService,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Something went wrong!!",
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!",
      });
    });
};

//find all
const findAll = (req,res)=>{
  // const user_id = req.body.id;
  model.userService.findAll({
    // where: { user_id: user_id },
    attributes: ["user_id", "service_id", "payment_id"],
  }).then((userServices) => {
    if (userServices) {
      res.status(200).json({
        message: "User Services fetched successfully",
        result: userServices,
      });
    } else {
      res.status(404).json({
        message: "No user services found",
      });
    }
  });

}

//delete
const delet = (req,res)=>{

  const user_id = req.userData. id;
  model.userService
    .destroy({
      where: { user_id: user_id },
    })
    .then((deletedUserService) => {
      if (deletedUserService) {
        res.status(200).json({
          message: `Successfully deleted ${user_id}`,
        });
      } else {
        res.status(404).json({
          message: "userService not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while deleting userService",
      });
    });
}

//update 
const update = (req,res)=>{

  const user_id = req.userData.id;
  const new_service_id = req.body.service_id;
  const new_payment_id = req.body.payment_id;
  model.userService
    .findOne({
      where: { user_id: user_id },
      attributes: ["user_id", "service_id", "payment_id"],
    })
    .then((userService) => {
      if (userService) {
        userService.service_id = new_service_id;
        userService.payment_id = new_payment_id;
        model.userService
          .save()
          .then((updatedUserService) => {
            res.status(200).json({
              message: "Successfully updated",
              result: updatedUserService,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error while updating userService",
            });
          });
      } else {
        res.status(404).json({
          message: "userService not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while updating userService",
      });
    });
}



//get userServices by id
const getUserSerivceById = async (req, res) => {
  const findUser = await model.User.findOne({
    attributes: {
      exclude: [
        "contact",
        "password",
        "gender",
        "createdAt",
        "IsAdmin",
        "updatedAt",
      ],
    },
    include: [
      {
        model: Service,
        as: "Service",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
      },
      {
        model: Location,
        as: "Location",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
      },
    ],
    where: { id: req.userData.id },
  });
  if (findUser) {
    res.status(200).json({
      message: "Successfully found!!",
      result: findUser,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};

module.exports = { createUserService, getUserSerivceById ,findAll,delet,update};
