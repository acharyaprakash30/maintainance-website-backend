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
    userId: req.userData.userId,
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
            userId: {
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
            serviceId: {
              [Op.like]: "%" + filter + "%",
            },
          },
          {
            paymentId: {
              [Op.like]: "%" + filter + "%",
            },
          },
          {
            storeId: {
              [Op.like]: "%" + filter + "%",
            },
          }
        ],
      },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "name", "email", "contact", "gender"],
        },
        {
          model: models.Service,
          as: "service"
        },
        {
          model: models.Payment,
          as: "payment"
        },
        {
          model: models.Store,
          as: "store"
        },
        {
          model: models.UserServiceFeature,
          as: "servicefeatures",
          include:[
            {
              model:models.ServiceType,
              as:"serviceType"
            }
          ]
        },
      ],
    })
    .then((result) => {
      res.status(200).json({
        data: result.rows,
        totaldata: result.count
      });
    });
});
//show order by vendor
const getUserServiceByIdOnly = catchError(async(req, res) => {
  models.userService
  .findOne({
    where: {
      id:req.params.id,
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.Service,
        as: "service"
      },
      {
        model: models.Payment,
        as: "payment"
      },
      {
        model: models.Store,
        as: "store"
      },
      {
        model: models.UserServiceFeature,
        as: "servicefeatures",
        include:[
          {
            model:models.ServiceType,
            as:"serviceType"
          }
        ]
      },
    ],
  }).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Id not found",
      });
    }
  });
});
//show order by vendor
const getUserSerivceByVendorId = catchError(async(req, res) => {
  const id = req.params.id;
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  models.userService
  .findAndCountAll({
    limit,
    offset,
    where: {
      storeId:req.params.id,
      [Op.or]: [
        {
          userId: {
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
          serviceId: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          paymentId: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          storeId: {
            [Op.like]: "%" + filter + "%",
          },
        }
      ],
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.Service,
        as: "service"
      },
      {
        model: models.Payment,
        as: "payment"
      },
      {
        model: models.Store,
        as: "store"
      },
      {
        model: models.UserServiceFeature,
        as: "servicefeatures",
        include:[
          {
            model:models.ServiceType,
            as:"serviceType"
          }
        ]
      },
    ],
  }).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Id not found",
      });
    }
  });
});
//get user by id
const getUserSerivceByUserId = catchError(async(req, res) => {
  const id = req.params.id;
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  models.userService
  .findAndCountAll({
    limit,
    offset,
    where: {
      userId:req.params.id,
      [Op.or]: [
        {
          userId: {
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
          serviceId: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          paymentId: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          storeId: {
            [Op.like]: "%" + filter + "%",
          },
        }
      ],
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.Service,
        as: "service"
      },
      {
        model: models.Store,
        as: "store"
      },
      {
        model: models.Payment,
        as: "payment"
      },
      {
        model: models.UserServiceFeature,
        as: "servicefeatures",
        include:[
          {
            model:models.ServiceType,
            as:"serviceType"
          }
        ]
      },
    ],
  }).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Id not found",
      });
    }
  });
});
const update = catchError((req, res) => {
  const id = req.params.id;
  models.userService.findOne({ where: { id: id } }).then((exists) => {
    if (exists) {
      const updatedUserService = {
        status: req.body.status
      };
      models.userService
        .update(updatedUserService, { where: { id: id } })
        .then((result) => {
          res.status(200).json({
            message: "service status updated successfully!!",
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
const bulkServiceSubmit= catchError((async(req,res)=>{
    let t;
    await sequelize.transaction(async (t) => {
      let images = [];
      if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
              let imagefile = req.files[i].path;
              images.push(imagefile);
          }
      }
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
        serviceDate:req.body.serviceDate,
        image:JSON.stringify(images)
      };
      const UserServiceFeatureArray = JSON.parse(req.body.serviceFeatures);
      console.log(UserServiceFeatureArray,"============================================")

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

          subTotalPriceOfUser = subTotalPriceOfUser + item.featurePrice;
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
        message: "user order have been placed",
      });
    });
}))

module.exports = {
  createUserService,
  getUserSerivce,
  update,
  bulkServiceSubmit,
  getUserSerivceByUserId,
  getUserSerivceByVendorId,
  getUserServiceByIdOnly
};
