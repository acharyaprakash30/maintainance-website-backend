const { catchError } = require("../middleware/catchError");
const model = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");

//create location

const locationInput = catchError((req, res) => {
  const location = {
    address: req.body.address,
    userId: req.userData.id,
  };
  model.Location.create(location).then((Result) => {
    res.status(200).json({
      message: "location added successfully",
      result: location,
    });
  });
});

//edit location

const editlocation = catchError((req, res) => {
  const editedLocation = {
    address: req.body.address,
  };
  model.Location.findOne({ where: { id: req.params.id } }).then((result) => {
    if (result) {
      model.Location.update(editedLocation, {
        where: { id: req.params.id },
      }).then((update) => {
        res.status(200).json({
          messege: "location updated succcessfully!",
          editedLocation,
        });
      });
    } else {
      res.status(401).json({
        messege: "No location found",
      });
    }
  });
});
//delete

const deleteLocation = catchError((req, res) => {
  model.Location.destroy({ where: { id: req.params.id } }).then((result) => {
    if (result) {
      res.status(200).json({
        messege: `Location ${req.params.id} deleted`,
      });
    } else {
      res.status(404).json({
        messege: `Location not found`,
      });
    }
  });
});

//get all lcoation
const index = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  model.Location.findAndCountAll(
    {
      limit,
      offset,
      where: {
        [Op.or]: [
          {
            address: {
              [Op.like]: "%" + filter + "%",
            },
          },
          {
            userId: {
              [Op.like]: "%" + filter + "%",
            },
          },
        ],
      },
    },
    {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  ).then((result) => {
    res.status(200).json({
      data: result.rows,
    });
  });
});

//get Location by id
const show = catchError((req, res) => {
  const id = req.params.id;

  model.Location.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  }).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        messege: "Location not found",
      });
    }
  });
});

module.exports = {
  locationInput,
  editlocation,
  deleteLocation,
  index,
  show,
};
