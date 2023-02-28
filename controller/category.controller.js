const models = require('../models');

function save(req,res){
    
    if (req.file) {
        var img = req.file.path;
      }
    const category = {
        CategoryName : req.body.CategoryName,
        CategoryImage : img,
        parentId : req.body.parentId == 'null' ? null : req.body.parentId
    }
    console.log(category);

    models.Category.create(category).then(result => {
        res.status(201).json({
            message : "Product created succesfully",
            result: result
        });        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wring",
            error : error
        });        
    });
}

const showAll = async (req,res)=>{
    try{
        const AllCategory = await models.Category.findAll({
        });
        if(AllCategory){

            let categories = await AllCategories(AllCategory);
            res.status(200).json({
                data:categories
            })
        }
        else{
            res.status(404).json({
                message:"Category not found"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}


const AllCategories = async (data,parentId = null) => {
    
let categoryList = [];
     let parentCat;

     if(parentId == null){
         parentCat = data.filter((element)=>element.parentId == null)
     }
     else{
        parentCat = data.filter((element)=>element.parentId == parentId)
     }

     for(let dataCat of parentCat){
         categoryList.push({
             id : dataCat.id,
             CategoryName : dataCat.CategoryName,
             CategoryImage : dataCat.CategoryImage,
             child : await AllCategories(data,dataCat.id)
         });

     }

     return categoryList;
    }
 
const  showCategoryById = async(req, res) => {
    try{
        const id = req.params.id;
        const AllCategory = await models.Category.findByPk(id);
        if(AllCategory){
            res.status(200).json({
                data:AllCategory
            })
        }
        else{
            res.status(404).json({
                message:"Category not found"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }

    }

    const showCategories = (req, res) => {
        models.Category.findAll().then(result => {
            res.status(201).json(result);
        }).catch(error => {
            res.status(501).json({
                message:"Something went wrong!!",
                error : error
            });
            
        });
    }



module.exports = {
    save: save,
    showAll: showAll,
    showCategoryById : showCategoryById,
    showCategories : showCategories
}