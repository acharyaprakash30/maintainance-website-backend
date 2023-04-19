const models = require('../models');
const { sequelize } = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");




const createUserService = catchError(async (req, res) => {
  if (req.file) {
    var img = req.file.filename;
  }
  const userService = {
    userId: req.body.userId,
    image: img,
    description: req.body.description,
    status: req.body.status,
    serviceId: req.body.serviceId,
    paymentId: req.body.paymentId,
    storeId: req.body.storeId,
    fiscal_year_id: req.body.fiscal_year_id
  }

  await models.userService.findOne({ where: { userId: req.body.userId } }).then(result => {
    if (result) {
      models.userService.create(userService).then(result => {
        console.log(userService);
        res.status(201).json({
          message: "UserService created succesfully",
          result: userService
        });
      })
    } else {
      res.status(501).json({
        message: "userId doesnot exists!!"
      });
    }
  })
})


const getUserSerivce = catchError((req, res) => {

  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  models.userService.findAndCountAll({
    limit,
    offset, where: {
      [Op.or]: [
        {
          user_id: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          description: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          status: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          service_id: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          payment_id: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          store_id: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          fiscal_year_id: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
  })
    .then((result) => {
      res
        .status(200)
        .json({
          data: result.rows

        });
    })

})


const update = catchError((req, res) => {
  const id = req.params.id;

  models.userService.findOne({ where: { id: id } }).then(exists => {
    if (exists) {
      const updatedUserService = {
        userId: req.body.userId,
        image: req.file.filename,
        description: req.body.description,
        status: req.body.status,
        serviceId: req.body.serviceId,
        paymentId: req.body.paymentId,
        storeId: req.body.storeId,
        fiscal_year_id: req.body.fiscal_year_id

      }
      models.userService.update(updatedUserService, { where: { id: id } }).then(result => {
        res.status(200).json({
          message: "UserService updated successfully!!",
          result: updatedUserService
        });
      })
    } else {
      res.status(404).json({
        message: "User Service with id " + id + " is not valid"
      });
    }
  })

}
)

const delet = catchError((req, res) => {

  const id = req.params.id;

  models.userService.destroy({ where: { id: id } }).then(result => {
    if (result) {
      res.status(200).json({
        message: "User Service deleted succesfully",

      });
    } else {
      res.status(404).json({
        message: "User Service id is not in the list!!"
      });
    }

  })
})

const bulkServiceSubmit = catchError(async (req, res) => {
  let t;
  await sequelize.transaction(async (t) => {
    if (req.file) {
      var img = req.file.path;
    }
    const serviceData = {
      userId: req.userData.id,
      image: img,
      description: req.body.description,
      status: req.body.status,
      serviceId: req.body.serviceId,
      paymentId: req.body.paymentId,
      storeId: req.body.storeId,
    };
    const UserServiceFeatureArray = JSON.parse(req.body.serviceFeatures);
    let userService = await models.userService.create(serviceData, { transaction: t });
    let subTotalPriceOfUser = 0;
    await Promise.all(
      UserServiceFeatureArray.map(async (item) => {

        const service = await models.UserServiceFeature.findByPk(item.featureId);

        if (!service) {
          return res.status(400).json({
            message: "service feature doesnot exist",
          });
        }

        let serviceDatas = {
          userServiceId: userService.id,
          featureId: item.featureId,
          featurePrice: item.featurePrice,
        };
        subTotalPriceOfUser = subTotalPriceOfUser + featurePrice;
        let savedOrderItem = await models.UserServiceFeature.create(serviceDatas, {
          transaction: t,
        });
      })
    );

    let isUser = await models.User.findByPk(req.body.userId);
    if (!isUser) {
      return res.status(400).json({
        message: "user doesnot exist",
      });

    }
    else {
      let updatedItem = {
        subTotal: subTotalPriceOfUser
      }
      await models.user.update(updatedItem, { where: { id: isUser.id } }, { transaction: t });
    }
    return res.status(200).json({
      message: "user service created successfully",
    });

  });

}
)

module.exports = {
  createUserService,
  getUserSerivce,
  delet,
  update,
  bulkServiceSubmit
}





// const model = require("../models");
// const service = require("../models/service");
// const { Service, Location, Payment } = model;

// //create userservice
// const createUserService = (req, res) => {
//   const userId = req.userData.id;
//   model.User.findByPk(userId, {
//     include: [
//       {
//         model: Service,
//         as: "Service",
//         required: false,
//         attributes: ["id"],
//       },
//       {
//         model: Payment,
//         as: "Payment",
//         required: false,
//         attributes: ["id"],
//       },
//     ],
//   })
//     .then((user) => {
//       if (user) {
//         let userServicesCreated = 0;
//         const serviceIds = user.Service.map((service) => service.id);
//         serviceIds.forEach((serviceId) => {
//           userId;
//           const serviceId = serviceId;
//           const paymentId = user.Payment.id;

//           model.userService
//             .create({
//               userId,
//               serviceId: serviceId,
//               paymentId: paymentId,
//             })
//             .then((result) => {
//               userServicesCreated++;
//               if (userServicesCreated === serviceIds.length) {
//                 res.status(200).json({
//                   message: "Successfully created!!",
//                   result: { userId, serviceIds, paymentId },
//                 });
//               }
//             })
//             .catch((err) => {
//               res.status(500).json({
//                 message: "Something went wrong!!",
//               });
//             });
//         });
//       } else {
//         res.status(404).json({
//           message: "User not found",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Something went wrong!!",
//       });
//     });
// };

// //find all
// const findAll = (req, res) => {
//   // const userId = req.body.id;
//   model.userService
//     .findAll({
//       // where: { userId: userId },
//       attributes: ["userId", "serviceId", "paymentId"],
//     })
//     .then((userServices) => {
//       if (userServices) {
//         res.status(200).json({
//           message: "User Services fetched successfully",
//           result: userServices,
//         });
//       } else {
//         res.status(404).json({
//           message: "No user services found",
//         });
//       }
//     });
// };

// //delete
// const delet = (req, res) => {
//   const userId = req.userData.id;
//   model.userService
//     .destroy({
//       where: { userId: userId },
//     })
//     .then((deletedUserService) => {
//       if (deletedUserService) {
//         res.status(200).json({
//           message: `Successfully deleted ${userId}`,
//         });
//       } else {
//         res.status(404).json({
//           message: "userService not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error while deleting userService",
//       });
//     });
// };

// //update
// const update = (req, res) => {
//   const userId = req.userData.id;
//   const new_serviceId = req.body.serviceId;
//   const new_paymentId = req.body.paymentId;
//   model.userService
//     .findOne({
//       where: { userId: userId },
//       attributes: ["userId", "serviceId", "paymentId"],
//     })
//     .then((userService) => {
//       if (userService) {
//         userService.serviceId = new_serviceId;
//         userService.paymentId = new_paymentId;
//         model.userService
//           .save()
//           .then((updatedUserService) => {
//             res.status(200).json({
//               message: "Successfully updated",
//               result: updatedUserService,
//             });
//           })
//           .catch((err) => {
//             res.status(500).json({
//               message: "Error while updating userService",
//             });
//           });
//       } else {
//         res.status(404).json({
//           message: "userService not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error while updating userService",
//       });
//     });
// };

// //get userServices by id
// const getUserSerivceById = async (req, res) => {
//   const findUser = await model.User.findOne({
//     attributes: {
//       exclude: [
//         "contact",
//         "password",
//         "gender",
//         "createdAt",
//         "IsAdmin",
//         "updatedAt",
//       ],
//     },
//     include: [
//       {
//         model: Service,
//         as: "Service",
//         attributes: {
//           exclude: ["userId", "createdAt", "updatedAt"],
//         },
//       },
//       {
//         model: Location,
//         as: "Location",
//         attributes: {
//           exclude: ["userId", "createdAt", "updatedAt"],
//         },
//       },
//     ],
//     where: { id: req.userData.id },
//   });
//   if (findUser) {
//     res.status(200).json({
//       message: "Successfully found!!",
//       result: findUser,
//     });
//   } else {
//     res.status(500).json({
//       message: "Something went wrong!!",
//     });
//   }
// };

// module.exports = {
//   createUserService,
//   getUserSerivceById,
//   findAll,
//   delet,
//   update,
// };
