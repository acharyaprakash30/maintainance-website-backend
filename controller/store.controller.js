const models = require("../models");
const geolib = require("geolib");
const { sequelize } = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");


//this user input store the data in three databases 1.Store 2.ServiceStore 3.StoreServiceFeature
//in first promise function we save the data of store and service store data in database
//in second promise function we first extract the array in which we have a required array which need to store in database
//data are stored in this format:
// "name":"abc",
// "image":"tea",
// "latitude":"sd",
// "longitude":"d",
// "address":"d",
// "Contactno":"000",
// storeService:
// [
//   {
//     "serviceId":1,
//     "serviceTypeFeature":[
//       {"serviceFeatureId":1,"price":10},
//       {"serviceFeatureId":2,"price":20}
//     ]
//   },
//   {
//     "serviceId":2,
//     "serviceTypeFeature"🙁
//       {"serviceFeatureId":3,"price":10},
//       {"serviceFeatureId":4,"price":20}
//     ]
//   }
// ]
const userInput = catchError(async (req, res) => {

  let t;
  await sequelize.transaction(async (t) => {
    if (req.file) {
      var img = req.file.path;
    }
    const storeData = {
      name: req.body.name,
      image: img,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      userId: req.userData.id,
      contactNumber: req.body.contactNumber,
    };
    const storeService = JSON.parse(req.body.storeService);
    const savedStore = await models.Store.create(storeData, {
      transaction: t,
    });
    let savedOrderItemArray = [];
    await Promise.all(
      storeService.map(async (item) => {
        const service = await models.Service.findByPk(item.serviceId);
        if (!service) {
          return res.status(400).json({
            message: "service item doesnot exist",
          });
        }
        let serviceDatas = {
          storeId: savedStore.id,
          serviceId: item.serviceId,
        };
        let savedOrderItem = await models.ServiceStore.create(serviceDatas, {
          transaction: t,
        });
        let itemObject = {
          itemId: savedOrderItem.id,
        };
        savedOrderItemArray.push(itemObject);
      })
    );
    const servicesArrayTemp = serviceOrderToFindArray(savedOrderItemArray, storeService);
    await Promise.all(
      servicesArrayTemp.map(async (item) => {
        const serviceFeatures = await models.ServiceType.findByPk(item.serviceFeatureId);
        if (!serviceFeatures) {
          return res.status(400).json({
            message: "service feature item doesnot exist",
          });
        }
        let serviceDatas = {
          serviceFeatureId: item.serviceFeatureId,
          price: item.price,
          storeServiceId: item.storeServiceId
        };
        let savedOrderItemFeature = await models.StoreServiceFeature.create(serviceDatas, {
          transaction: t,
        });
      })
    );
    return res.status(200).json({
      message: "store created sucessfully",
    });
  })
}
)
//this function was called from userinput which return a array for storeservicefeature model
const serviceOrderToFindArray = ((savedOrderItemArray, storeService) => {
  var servicesArrayTemp = [];

  for (let i = 0; i < storeService.length; i++) {
    let storeFeatureTest = storeService[i].serviceTypeFeature;
    for (let j = 0; j < storeFeatureTest.length; j++) {
      let services = {
        serviceFeatureId: storeFeatureTest[j].serviceFeatureId,
        price: storeFeatureTest[j].price,
        storeServiceId: savedOrderItemArray[i].itemId,
      };
      servicesArrayTemp.push(services)
    }
  }
  return servicesArrayTemp;

})

const showdata = async(req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  await models.Store.findAndCountAll({
    limit,
    offset, where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          address: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          contactNumber: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.ServiceStore,
        as: "Servicestore",
        include: [
          {
            model: models.Service,
            as: "service",

          },
          {
            model: models.StoreServiceFeature,
            as: "serviceStoreFeatures",
            include: [
              {
                model: models.ServiceType,
                as: "serviceType",
              },
            ]
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.status(201).json({
        data: result.rows,
        totaldata: result.count
      });
    }).catch((err)=>{
      res.status(500).json({
        error:err.message
      })
    })
}

const showdataByVendor = async(req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  const id = req.params.id;
  try{
await  models.Store.findAndCountAll({
    limit,
    offset, where: {
      userId:id,
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          address: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          contactNumber: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.ServiceStore,
        as: "Servicestore",
        include: [
          {
            model: models.Service,
            as: "service",

          },
          {
            model: models.StoreServiceFeature,
            as: "serviceStoreFeatures",
            include: [
              {
                model: models.ServiceType,
                as: "serviceType",
              },
            ]
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.status(201).json({
        data: result.rows,
        totaldata: result.count
      });
    }).catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
  }

    catch(err){
      res.status(500).json({
          error:err.message,
          message:"Internal Server Error"
      })
  }

}

const editStoreData = catchError((req, res) => {
  const id = req.params.id;

  models.Store.findByPk(id)
    .then((storeData) => {
      if (storeData) {
        const updatedStoreData = {
          name: req.body.name,
          image: req.file.path,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          address: req.body.address,
          userId: req.body.userId,
          contactNumber: req.body.contactNumber,
        };

        storeData
          .update(updatedStoreData)
          .then((result) => {
            res.status(200).json({
              message: "StoreData updated succesfully",
              result: updatedStoreData,
            });
          })

      } else {
        res.status(404).json({
          message: "StoreData with id " + id + " is not valid",
        });
      }
    })

})

const destroyStoreData = catchError((req, res) => {
  const id = req.params.id;

  models.Store.destroy({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "StoreDAta deleted succesfully",
        });
      } else {
        res.status(404).json({
          message: "StoreData id is not in the list!!",
        });
      }
    })
})
const getPlaceByCoordinates = catchError(async (req, res) => {
  const givenLatitude = req.params.latitude;
  const givenLongitude = req.params.longitude;
  const serviceId = req.params.serviceId;

  if (!givenLatitude || !givenLongitude || !serviceId) {
    return res.status(400).json({
      message: "Latitude ,longitude and service are required",
    });
  }

  let allresult = await models.Store.findAll({
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["id", "name", "email", "contact", "gender"],
      },
      {
        model: models.ServiceStore,
        as: "Servicestore",
        include: [
          {
            model: models.Service,
            as: "service",
          },
          {
            model: models.StoreServiceFeature,
            as: "serviceStoreFeatures",
            include: [
              {
                model: models.ServiceType,
                as: "serviceType",
              },
            ]
          },
        ],
        where: {
          serviceId: serviceId
        }

      },
    ],
  })
  // check if there are any stores in the database
  if (!Array.isArray(allresult) || allresult.length === 0) {
    return res.status(400).json({
      message: "No stores found in the database",
    });
  }
  let nearbyplaces = [];
  for (let i = 0; i < allresult.length; i++) {
    itemdistance = geolib.getDistance(
      { latitude: allresult[i].latitude, longitude: allresult[i].longitude },
      { latitude: givenLatitude, longitude: givenLongitude }
    );
    let distance = geolib.convertDistance(itemdistance, "km");
    nearbyplaces.push({
      id: allresult[i].id,
      Storename: allresult[i].name,
      latitude: allresult[i].latitude,
      longitude: allresult[i].longitude,
      image: allresult[i].image,
      distance: parseFloat(distance.toFixed(2)) + " km",
      address: allresult[i].address,
      Servicestore: allresult[i].Servicestore,
    })

    async function getPlaceByCoordinates(req, res) {
      const givenLatitude = req.params.latitude;

      const givenLongitude = req.params.longitude;

      if (!givenLatitude || !givenLongitude) {
        return res.status(400).json({
          message: "Latitude and longitude are required",
        });
      }

      let allresult = await models.Store.findAll();

      // check if there are any stores in the database
      if (!Array.isArray(allresult) || allresult.length === 0) {
        return res.status(400).json({
          message: "No stores found in the database",
        });
      }

      let nearbyplaces = [];

      for (let i = 0; i < allresult.length; i++) {
        itemdistance = geolib.getDistance(
          {
            latitude: allresult[i].latitude,
            longitude: allresult[i].longitude,
          },
          { latitude: givenLatitude, longitude: givenLongitude }
        );

        let distance = geolib.convertDistance(itemdistance, "km");

        nearbyplaces.push({
          id: allresult[i].id,
          placeName: allresult[i].placeName,
          distance: parseFloat(distance.toFixed(2)) + " km",
        });
      }
      // sort the nearby places based on the distance
      nearbyplaces = nearbyplaces.sort((a, b) => a.distance - b.distance);

      if (!nearbyplaces) {
        return res.status(400).json({
          message: "Nothing Nearby!!",
        });
      } else {
        return res.status(200).json({
          message: " Success",
          result: nearbyplaces,
        });
      }
    }
  }
  // sort the nearby places based on the distance
  nearbyplaces.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  if (!nearbyplaces) {
    return res.status(400).json({
      message: "Nothing Nearby!!",
    });
  } else {
    return res.status(200).json({
      message: " Success",
      result: nearbyplaces,
    });
  }
})

module.exports = {
  userInput: userInput,
  showdata: showdata,
  showdataByVendor: showdataByVendor,
  editStoreData: editStoreData,
  destroyStoreData: destroyStoreData,
  getPlaceByCoordinates: getPlaceByCoordinates,
};