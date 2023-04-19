const models = require('../models');
const fs = require("fs");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");

const save = catchError((req, res) => {
  if (req.file) {
    var img = req.file.path;
  }
  const category = {
    CategoryName: req.body.CategoryName,
    CategoryImage: img,
    parentId: req.body.parentId == "null" ? null : req.body.parentId,
  };

  models.Category.create(category)
    .then((result) => {
      res.status(201).json({
        message: "Category created succesfully",
        result: result,
      });
    })
})


const showAll = catchError(async (req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;

  const AllCategory = await models.Category.findAndCountAll({
    limit,
    offset, where: {
      [Op.or]: [
        {
          CategoryName: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    }
  });
  if (AllCategory) {
    let categories = await AllCategories(AllCategory);
    const objectsWithEmptyChild = getObjectsWithEmptyChild(categories);

    res.status(200).json(
      {
        data: categories.rows,
        objectsWithEmptyChild: objectsWithEmptyChild,
      });
  } else {
    res.status(404).json({
      message: "Category not found",
    });

  }
})


function getObjectsWithEmptyChild(categories) {
  const result = [];

  categories.forEach(category => {
    if (category.child.length === 0) {
      result.push(category);
    } else {
      const objectsWithEmptyChild = getObjectsWithEmptyChild(category.child);
      result.push(...objectsWithEmptyChild);
    }
  });

  return result;
}


const AllCategories = async (data, parentId = null) => {
  let categoryList = [];
  let parentCat;

  if (parentId == null) {
    parentCat = data.filter((element) => element.parentId == null)
  }
  else {
    parentCat = data.filter((element) => element.parentId == parentId)
  }

  for (let dataCat of parentCat) {
    categoryList.push({
      id: dataCat.id,
      CategoryName: dataCat.CategoryName,
      CategoryImage: dataCat.CategoryImage,
      child: await AllCategories(data, dataCat.id)
    });

  }

  return categoryList;
}

const showCategoryById = catchError(async (req, res) => {

  const id = req.params.id;
  const AllCategory = await models.Category.findByPk(id);
  if (AllCategory) {
    res.status(200).json({
      data: AllCategory
    })
  }
  else {
    res.status(404).json({
      message: "Category not found"
    })
  }
})


const showCategories = catchError(async (req, res) => {
  const { page = 0, size = 10 } = req.query;
  const { limit, offset } = PaginationData.getPagination(page, size);
  const { filter = "" } = req.query;

  await models.Category.findAll({
    limit, offset, where: {
      [Op.or]: [
        {
          CategoryName: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
  }).then(async (result) => {
    let categoryWithParentName = await getCategoriesWithParent(result);
    res.status(201).json(
      { data: categoryWithParentName.rows }
    );
  })
}
)
const getCategoriesWithParent = (data) => {

  let categoryWithParentName = [];

  data.forEach((item) => {
    if (item.parentId == null) {
      let itemcategoryWithParentName = {
        id: item.id,
        CategoryName: item.CategoryName,
        CategoryImage: item.CategoryImage,
        parentId: item.parentId,
        parentName: null,
      }
      categoryWithParentName.push(itemcategoryWithParentName);
    }
    else {
      data.forEach((dataloop) => {
        if (item.parentId == dataloop.id) {
          let itemcategoryWithParentName = {
            id: item.id,
            CategoryName: item.CategoryName,
            CategoryImage: item.CategoryImage,
            parentId: item.parentId,
            parentName: dataloop.CategoryName,
          }
          categoryWithParentName.push(itemcategoryWithParentName);
        }
      })
    }
  });
  return categoryWithParentName;
}


//update user
const updateCategoryById = catchError((req, res) => {
  models.Category.findOne({ where: { id: req.params.id } })
    .then(async (exist) => {
      const editCategory = {
        CategoryName: req.body.CategoryName,
        parentId: req.body.parentId,
      };

      if (exist) {
        if (req.file) {
          let oldFileName = "";
          oldFileName = exist.image;
          if (oldFileName) {
            fs.unlinkSync(oldFileName);
          }
          editCategory.CategoryImage = req.file.path;
        }
        models.Category.update(editCategory, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "category updated succcessfully!",
              updated: update,
            });
          })

      } else {
        res.status(401).json({
          messege: "user not found",
        });
      }
    })

});


//delete user
const deleteCategory = catchError((req, res) => {
  models.Category.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `category deleted`,
          id: req.params.id,
        });
      } else {
        res.status(404).json({
          messege: `category not found`,
        });
      }
    })

});


module.exports = {
  save: save,
  showAll: showAll,
  showCategoryById: showCategoryById,
  showCategories: showCategories,
  updateCategoryById: updateCategoryById,
  deleteCategory: deleteCategory
}