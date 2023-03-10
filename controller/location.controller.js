const model = require("../models");

//create location

const locationInput = (req, res) => {
  const location = {
    address: req.body.address,
    userId: req.userData.id,
  };
  model.Location.create(location)
    .then((Result) => {
      res.status(200).json({
        message: "location added successfully",
        result: location,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        err,
      });
    });
};

//edit location

const editlocation = (req, res) => {
  const editedLocation = {
    address: req.body.address,
  };
  model.Location.findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        model.Location.update(editedLocation, {
          where: { id: req.params.id },
        })
          .then((update) => {
            res.status(200).json({
              messege: "location updated succcessfully!",
              editedLocation,
            });
          })
          .catch((err) => {
            res.status(500).json({
              messege: "something went wrong!",
            });
          });
      } else {
        res.status(401).json({
          messege: "No location found",
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

const deleteLocation = (req, res) => {
  model.Location.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `Location ${req.params.id} deleted`,
        });
      } else {
        res.status(404).json({
          messege: `Location not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
        err,
      });
    });
};

//get all lcoation
const index = (req, res) => {
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
  model.Location.findAndCountAll(
    { limit: size, offset: page * size },
    {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        content: result.rows,
        totalPages: Math.ceil(result.count / Number.parseInt(size)),
      });
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//get Location by id
const show = (req, res) => {
  const id = req.params.id;

  model.Location.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          messege: "Location not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

module.exports = {
  locationInput,
  editlocation,
  deleteLocation,
  index,
  show,
};
