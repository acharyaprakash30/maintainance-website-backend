const models = require('../models');


const createUserService =  async(req, res) => {
  if (req.file) {
    var img = req.file.filename;
  }
  const userService = {
    user_id: req.body.user_id,
    image:img,
    description: req.body.description,
    status: req.body.status,
    service_id: req.body.service_id,
    payment_id: req.body.payment_id,
    store_id: req.body.store_id,
    fiscal_year_id : req.body.fiscal_year_id
  }

  await models.userService.findOne({where : {user_id : req.body.user_id}}).then(result => {
    if(result){
      models.userService.create(userService).then(result =>{
        console.log(userService);
        res.status(201).json({
          message: "UserService created succesfully",
          result : userService
        });  
      }).catch(error => {
          res.status(501).json({
            message: "Something went wrong!! ",
            error : error
          });
      });
    }else{
      res.status(501).json({
        message : "User_id doesnot exists!!"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Something went wrong!! ",
      error : error
    });
  });  
}

const getUserSerivce = (req, res) => {
  models.userService.findAll().then(result => {
    res.status(201).json(result);
  }).catch(error => {
    res.status(501).json({
      message : "Something went wrong !!"
    });
  });
  
}


const update = (req, res) => {
  const id = req.params.id;

  models.userService.findOne({where: {id:id}}).then(exists => {
    if(exists){
      const updatedUserService = {
        user_id: req.body.user_id,
        image:req.file.filename,
        description: req.body.description,
        status: req.body.status,
        service_id: req.body.service_id,
        payment_id: req.body.payment_id,
        store_id: req.body.store_id,
        fiscal_year_id : req.body.fiscal_year_id
    
      }
      models.userService.update(updatedUserService,{where : {id:id}}).then(result => {
        res.status(200).json({
          message: "UserService updated successfully!!",
          result: updatedUserService
        });
      }).catch(error => {
        res.status(501).json( {
          message : "Something went wrong!! ",
          error : error
        });
      });
    }else {
      res.status(404).json({
        message : "User Service with id " + id + " is not valid"
      });      
    }
  }).catch(error => {
    res.status(501).json({
      message : "Something went wrong!!",
      error : error
    });
  });

}


const delet = (req, res) => {

  const id = req.params.id;

  models.userService.destroy({where: {id:id}}).then(result => {
    if(result){
      res.status(200).json({
          message: "User Service deleted succesfully",
          
      });
    }else{
      res.status(404).json({
          message: "User Service id is not in the list!!"
      });
    }
    
  }).catch(error => {
      res.status(500).json({
          message : "Something went wrong",
          error : error
      });
    
  });
}


module.exports = {
  createUserService,
  getUserSerivce,
  delet,
  update
}





// const model = require("../models");
// const service = require("../models/service");
// const { Service, Location, Payment } = model;

// //create userservice
// const createUserService = (req, res) => {
//   const user_id = req.userData.id;
//   model.User.findByPk(user_id, {
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
//         serviceIds.forEach((service_id) => {
//           user_id;
//           const serviceId = service_id;
//           const payment_id = user.Payment.id;

//           model.userService
//             .create({
//               user_id,
//               service_id: service_id,
//               payment_id: payment_id,
//             })
//             .then((result) => {
//               userServicesCreated++;
//               if (userServicesCreated === serviceIds.length) {
//                 res.status(200).json({
//                   message: "Successfully created!!",
//                   result: { user_id, serviceIds, payment_id },
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
//   // const user_id = req.body.id;
//   model.userService
//     .findAll({
//       // where: { user_id: user_id },
//       attributes: ["user_id", "service_id", "payment_id"],
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
//   const user_id = req.userData.id;
//   model.userService
//     .destroy({
//       where: { user_id: user_id },
//     })
//     .then((deletedUserService) => {
//       if (deletedUserService) {
//         res.status(200).json({
//           message: `Successfully deleted ${user_id}`,
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
//   const user_id = req.userData.id;
//   const new_service_id = req.body.service_id;
//   const new_payment_id = req.body.payment_id;
//   model.userService
//     .findOne({
//       where: { user_id: user_id },
//       attributes: ["user_id", "service_id", "payment_id"],
//     })
//     .then((userService) => {
//       if (userService) {
//         userService.service_id = new_service_id;
//         userService.payment_id = new_payment_id;
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
