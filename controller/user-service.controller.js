const models = require("../models");
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
    serviceLatitude: req.body.serviceLatitude,
    serviceLongitude: req.body.serviceLongitude,
    serviceLocation: req.body.serviceLocation,
  };

  await models.userService
    .findOne({ where: { userId: req.body.userId } })
    .then((result) => {
      if (result) {
        models.userService.create(userService).then((result) => {
          console.log(userService);
          res.status(201).json({
            message: "UserService created succesfully",
            result: userService,
          });
        });
      } else {
        res.status(501).json({
          message: "userId doesnot exists!!",
        });
      }
    });
});

const getUserSerivce = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  models.userService
    .findAndCountAll({
      limit,
      offset,
      where: {
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
      res.status(200).json({
        data: result.rows,
      });
    });
});

const update = catchError((req, res) => {
  const id = req.params.id;

  models.userService.findOne({ where: { id: id } }).then((exists) => {
    if (exists) {
      const updatedUserService = {
        userId: req.body.userId,
        image: req.file.filename,
        description: req.body.description,
        status: req.body.status,
        serviceId: req.body.serviceId,
        paymentId: req.body.paymentId,
        storeId: req.body.storeId,
        fiscal_year_id: req.body.fiscal_year_id,
      };
      models.userService
        .update(updatedUserService, { where: { id: id } })
        .then((result) => {
          res.status(200).json({
            message: "UserService updated successfully!!",
            result: updatedUserService,
          });
        });
    } else {
      res.status(404).json({
        message: "User Service with id " + id + " is not valid",
      });
    }
  });
});

const delet = catchError((req, res) => {
  const id = req.params.id;

  models.userService.destroy({ where: { id: id } }).then((result) => {
    if (result) {
      res.status(200).json({
        message: "User Service deleted succesfully",
      });
    } else {
      res.status(404).json({
        message: "User Service id is not in the list!!",
      });
    }
  });
});

const bulkServiceSubmit= (async(req,res)=>{
  try{
    let t;
    await sequelize.transaction(async (t) => {
      // if (req.file) {
      //   var img = req.file.path;
      // }
      const serviceData = {
        userId: req.userData.id,
        description: req.body.description,
        status: req.body.status,
        serviceId: req.body.serviceId,
        paymentId: req.body.paymentId,
        storeId: req.body.storeId,
        serviceLatitude: req.body.serviceLatitude,
        serviceLongitude: req.body.serviceLongitude,
        serviceLocation: req.body.serviceLocation,
      };
      const UserServiceFeatureArray = JSON.parse(req.body.serviceFeatures);

      let userService = await models.userService.create(serviceData, {
        transaction: t,
      });
      let subTotalPriceOfUser = 0;
      await Promise.all(
        UserServiceFeatureArray.map(async (item) => {
          const service = await models.ServiceType.findByPk(
            item.featureId
          );
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
          let savedOrderItem = await models.UserServiceFeature.create(
            serviceDatas,
            {
              transaction: t,
            }
          );
        })
      );
        let updatedItem = {
          subTotal:subTotalPriceOfUser
        }
        await models.User.update(updatedItem,{where:{id:req.userData.id}},{ transaction: t })

      return res.status(200).json({
        message: "user service created successfully",
      });
    });
  }catch(e){
    res.status(500).json({
      message:"internal server error",
      error:e.message
    })
  }
})

module.exports = {
  createUserService,
  getUserSerivce,
  delet,
  update,
  bulkServiceSubmit,
};
