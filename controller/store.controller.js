const models = require("../models");
const geolib = require("geolib");
const { sequelize } = require("../models");

const userInput = async (req, res) => {
  try {
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
          userId: req.body.userId,
          contactNumber: req.body.contactNumber,
        };
        const storeService = JSON.parse(req.body.storeService);
        const savedStore = await models.Store.create(storeData,{ transaction: t });

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
                    serviceId:item.serviceId,
                    serviceTypeId: item.serviceType,
                    price: item.price,
                  };
                  let savedOrderItem = await models.ServiceStore.create(serviceDatas,{ transaction: t });
                })
              );
              return res.status(200).json({
                message: "store created sucessfully",
              });

    
        // const savedStore = await models.Store.create(storeData).then(async(data)=>{
        //     await Promise.all(
        //         storeService.map(async (item) => {
        //           const service = await models.Service.findByPk(item.serviceId);
        //           if (!service) {
        //             return res.status(400).json({
        //               message: "service item doesnot exist",
        //             });
        //           }
        //           let serviceDatas = {
        //             storeId: data.id,
        //             serviceId:item.serviceId,
        //             serviceTypeId: item.serviceType,
        //             price: item.price,
        //           };
        //           let savedOrderItem = await models.ServiceStore.create(serviceDatas);
        //         })
        //       );
            //   return res.status(200).json({
            //     message: "happy",
            //   });
        // }).catch((err)=>{
        //     return res.status(500).json({
        //         mesasge: err.message,
        //       });
        // })
    });    
  } catch (err) {
    return res.status(500).json({
      mesasge: err.message,
    });
  }
};
function showdata(req, res) {
  models.Store.findAll({
    include : [
            {
                model : models.User,
                as : "storeUser",
                attributes : ["id", "name", "email", "contact", "gender"]

            },
            {
              model : models.ServiceStore,
              as : "Servicestore",
              include:[
              {
                model : models.ServiceType,
                as : "StoreServiceTypes",
            },
            {
              model : models.Service,
              as : "service",
          },
              ]

          }
        ]
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(501).json({
        message: "Something went wrong!!",
        error: error,
      });
    });
}

function editStoreData(req, res) {
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
          .catch((error) => {
            res.status(500).json({
              message: "something went wrong",
              error: error,
            });
          });
      } else {
        res.status(404).json({
          message: "StoreData with id " + id + " is not valid",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!",
        error: error,
      });
    });
}

function destroyStoreData(req, res) {
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
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

async function getPlaceByCoordinates(req, res) {
  const givenLatitude = req.params.latitude;

  const givenLongitude = req.params.longitude;

  if (!givenLatitude || !givenLongitude) {
    return res.status(400).json({
      message: "Latitude and longitude are required",
    });
  }

  let allresult = await models.Store.findAll({
    include : [
      {
          model : models.User,
          as : "storeUser",
          attributes : ["id", "name", "email", "contact", "gender"]

      },
      {
        model : models.ServiceStore,
        as : "Servicestore",
        include:[
        {
          model : models.ServiceType,
          as : "StoreServiceTypes",
      },
      {
        model : models.Service,
        as : "service",
    },
        ]

    }
  ]
  });


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
      distance: parseFloat(distance.toFixed(2)) + " km",
      Servicestore:allresult[i].Servicestore

    });
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
}


module.exports = {
  userInput: userInput,
  showdata: showdata,
  editStoreData: editStoreData,
  destroyStoreData: destroyStoreData,
  getPlaceByCoordinates: getPlaceByCoordinates
};
