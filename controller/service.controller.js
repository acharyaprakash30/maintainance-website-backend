const model = require("../models")


// create service
const addService = (req, res) => {
    const service = {
        name:req.body.name,
        image:req.file.filename,
        slug:req.body.slug,
        userId:req.userData.id
    };
    console.log(req.userData);
    const createService = model.Service.create(service)
      .then((result) => {
        res.status(201).json({
          messege: "Service created successfully",
          result:service,
        });
      })
      .catch((error) => {
        res.status(500).json({
          messege: "Something went wrong",error
        });
      });
  };
//get all sercvices
const index = (req, res) => {
    model.Service.findAll({attributes:{
        exclude:[
            "createdAt",
            "updatedAt"
        ]
    }})
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
  
    model.Service.findByPk(id,{attributes:{
        exclude:[
            "createdAt",
            "updatedAt"
        ]
    }})
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
        const updated ={
            name:req.body.name,
            image:req.body.image,
            slug:req.body.slug,
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
//delete user
const deleteService = (req, res) => {
    model.Service.destroy({ where: { id:req.params.id } })
      .then((result) => {
        if (result) {
          res.status(200).json({
            messege: `Service ${req.params.id} deleted`,
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
  
  module.exports={addService,index,show,updateService,deleteService}