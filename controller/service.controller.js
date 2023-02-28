const model = require("../models")
const fs = require("fs");

// create service
const addService = async(req, res) => {
  if (req.file) {
    var img = req.file.path;
  }
    const service = {
        name:req.body.name,
        image:img,
        slug:req.body.slug,
        userId:req.userData.id,
        categoryId:req.body.categoryId
    };
    await model.Service.create(service)
      .then((result) => {
        res.status(201).json({
          messege: "Service created successfully",
          result:result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          messege: "Something went wrong",error
        });
      });
  };

//get all sercvices
// const index = (req, res) => {
//     model.Service.findAll({attributes:{
       
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
  const index = (req, res) => {

    model.Service.findAll({
        include : [
          {
            as: "selectedcategory",
            model : model.Category,
          },
          {
            as:"SubServicelist",
            model:model.ServiceType
          }
        ]

    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          messege: "Something went wrong!!",error
        });
      });
  };
  
  //get service by id
  const show = (req, res) => {
    const id = req.params.id;
  
    model.Service.findByPk(id,{
      include : [
        {
          as: "selectedcategory",
          model : model.Category,
        },
        {
          as:"SubServicelist",
          model:model.ServiceType
        }
      ]
    })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({
            messege: "Service not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          messege: "Something went wrong!!",error
        });
      });
  };
  
//update service
const updateService = (req,res)=>{
    model.Service.findOne({ where: { id:req.params.id } }).then((exist)=>{
      if(exist){
        if (req.file) {
          let oldFileName = "";
          oldFileName = exist.image;
          if (oldFileName) {
            fs.unlinkSync(oldFileName);
          }
          var img = req.file.path;
        }
      


        const updated ={
        name:req.body.name,
        image:img,
        slug:req.body.slug,
        userId:req.userData.id,
        categoryId:req.body.categoryId
        }
        model.Service.update(updated,{where:{id:req.params.id}}).then((update)=>{
          res.status(200).json({
            messege:"Service updated succcessfully!",
            updated,
          })
        }).catch(err=>{
          res.status(500).json({
            messege:"something went wrong!",
            err
          })
        })
      }else{
        res.status(401).json({
          messege:"Service not found"
        })
      }
    }).catch(err=>{
      res.status(500).json({
        messege:"something went wrong!",err
      })
    })
  }
  
//delete service
const deleteService = (req, res) => {
    model.Service.destroy({ where: { id:req.params.id } })
      .then((result) => {
        if (result) {
          res.status(200).json({
            messege: `Service  deleted`,
          });
        } else {
          res.status(404).json({
            messege: `Service not found`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          messege: "Something went wrong",err
        });
      });
  };

  //get service by categoryname/categoryId
  const getserviceByCategory = async(req,res)=>{
    try{
      await model.Service.findAll({where:{categoryId:req.params.categoryId}}).then(data =>{
        return res.status(200).json({
          data
        })
      }).catch((err)=>{
        return res.status(500).json({
          error:err.message,
          message:"Internal server error"
        })
      })
    }
    catch(err){
      return res.status(500).json({
        error:err.message
      })
    }

  }
  module.exports={addService,index,show,updateService,deleteService,getserviceByCategory}