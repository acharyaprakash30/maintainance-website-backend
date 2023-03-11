const models = require('../models');
const { sequelize } = require("../models");


const createUserService = async (req, res) => {
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
      }).catch(error => {
        res.status(501).json({
          message: "Something went wrong!! ",
          error: error
        });
      });
    } else {
      res.status(501).json({
        message: "userId doesnot exists!!"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Something went wrong!! ",
      error: error
    });
  });
}

const getUserSerivce = (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }
  models.userService.findAndCountAll({
    limit: size,
    offset: page * size
  })
    .then((result) => {
      res
        .status(200)
        .json({
          content: result.rows,
          totalPages: Math.ceil(result.count / Number.parseInt(size)),
        });
    }).catch(error => {
      res.status(501).json({
        message: "Something went wrong !!"
      });
    });

}


const update = (req, res) => {
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
      }).catch(error => {
        res.status(501).json({
          message: "Something went wrong!! ",
          error: error
        });
      });
    } else {
      res.status(404).json({
        message: "User Service with id " + id + " is not valid"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Something went wrong!!",
      error: error
    });
  });

}


const delet = (req, res) => {

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

  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });

  });
}

const bulkServiceSubmit = async (req, res) => {
  try {
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

    let isUser =  await models.User.findByPk(req.body.userId);
    if(!isUser){
      return res.status(400).json({
        message: "user doesnot exist",
      });

    }
    else{
      let updatedItem = {
        subTotal:subTotalPriceOfUser
      }
      await models.user.update(updatedItem,{where:{id:isUser.id}},{ transaction: t });
    }
      return res.status(200).json({
        message: "user service created successfully",
      });

    });
  } catch (error) {
    return res.status(500).json({
      data: error,
      mesasge: error.message,
    });
  }
}

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
