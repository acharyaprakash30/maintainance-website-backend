const model = require("../models");
const fs = require("fs");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");

// create service
const addService = catchError(async (req, res) => {
  if (req.file) {
    var img = req.file.path;
  }
  const service = {
    name: req.body.name,
    image: img,
    slug: req.body.slug,
    userId: req.userData.id,

    categoryId: req.body.categoryId,
  };
  await model.Service.create(service).then((result) => {
    res.status(201).json({
      messege: "Service created successfully",
      result: result,
    });
  });
});

//get all sercvices
// const index = (req, res) => {
//     model.Service.findAndCountAll({attributes:{

//         include : [
//           {
//             as: "SubServicelist",
//             model : model.ServiceType,
//           }
//         ]

//     }})
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((error) => {
//         res.status(500).json({
//           messege: "Something went wrong!!",error
//         });
//       });
//   };
const index = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  model.Service.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          slug: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          userId: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          categoryId: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
    include: [
      {
        as: "selectedcategory",
        model: model.Category,
      },
      {
        as: "SubServicelist",
        model: model.ServiceType,
      },
    ],
  }).then((result) => {
    res.status(200).json({ data: result.rows });
  });
});

//get only those services which have a relation with service features
const servicesByFeatues = catchError((req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;
  model.Service.findAndCountAll({
    limit,
    offset,
    include: [
      {
        as: "selectedcategory",
        model: model.Category,
      },
      {
        as: "SubServicelist",
        model: model.ServiceType,
        required: true,
      },
    ],
  }).then((result) => {
    res
      .status(200)
      .json({ data: PaginationData.getPagingData(result, page, limit) });
  });
});

//get service by id
const show = catchError((req, res) => {
  const id = req.params.id;

  model.Service.findByPk(id, {
    include: [
      {
        as: "selectedcategory",
        model: model.Category,
      },
      {
        as: "SubServicelist",
        model: model.ServiceType,
      },
    ],
  }).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        messege: "Service not found",
      });
    }
  });
});

//update service
const updateService = catchError((req, res) => {
  model.Service.findOne({ where: { id: req.params.id } }).then((exist) => {
    if (exist) {
      if (req.file) {
        let oldFileName = "";
        oldFileName = exist.image;
        if (oldFileName) {
          fs.unlinkSync(oldFileName);
        }
        var img = req.file.path;
      }

      const updated = {
        name: req.body.name,
        image: img,
        slug: req.body.slug,
        userId: req.userData.id,
        categoryId: req.body.categoryId,
      };
      model.Service.update(updated, { where: { id: req.params.id } }).then(
        (update) => {
          res.status(200).json({
            messege: "Service updated succcessfully!",
            updated,
          });
        }
      );
    } else {
      res.status(401).json({
        messege: "Service not found",
      });
    }
  });
});

//delete service
const deleteService = catchError((req, res) => {
  model.Service.destroy({ where: { id: req.params.id } }).then((result) => {
    if (result) {
      res.status(200).json({
        messege: `Service  deleted`,
      });
    } else {
      res.status(404).json({
        messege: `Service not found`,
      });
    }
  });
});

//get service by categoryname/categoryId
const getserviceByCategory = catchError(async (req, res) => {
  await model.Service.findAll({
    where: { categoryId: req.params.categoryId },
  }).then((result) => {
    return res.status(200).json({
      result: result,
    });
  });
});
module.exports = {
  addService,
  index,
  show,
  updateService,
  deleteService,
  getserviceByCategory,
  servicesByFeatues,
};
