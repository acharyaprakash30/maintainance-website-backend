const models = require('../models');

function userInput(req, res){
    const serviceType = {
        name: req.body.name,
        serviceId : req.body.serviceId,
    }

    models.ServiceType.create(serviceType).then(result =>{
        console.log(serviceType)
        res.status(201).json({
            message: "ServiceType created succesfully",
            result : serviceType
        });

    }).catch(error => {
        res.status(501).json({
            message: "Something went wrong!! ",
            error : error
        });
    });
    
}

function showdata(req, res){
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
    models.ServiceType.findAndCountAll({    
      limit: size,
      offset: page * size
    })
      .then((result) => {
        res
          .status(200)
          .json({
            content: result.rows,
            totalPages: Math.ceil(result.count / Number.parseInt(size)),
          });
      }).catch(error => {
        res.status(501).json({
            message:"Something went wrong!!",
            error : error
        });
        
    });
}
function showdataById(req, res){
    models.ServiceType.findByPk(req.params.id).then(result => {
        res.status(201).json(result);
    }).catch(error => {
        res.status(501).json({
            message:"Something went wrong!!",
            error : error
        });
        
    });
}

function editServiceType(req, res){

    const id = req.params.id;

    models.ServiceType.findByPk(id).then(serviceType => {
        if(serviceType){
            const updatedServiceType = {
                name : req.body.name,
                serviceId : req.body.serviceId,
            }

            serviceType.update(updatedServiceType).then(result => { 
                res.status(200).json({
                    message : "ServiceType updated succesfully",
                    serviceType : updatedServiceType
                });

            }).catch( error =>{
                res.status(500).json({
                    message:"something went wrong",
                    error: error
                });
            });
        }else{
            res.status(404).json({
                message : "ServiceType with id " + id + " is not valid"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong!!",
            error : error
        });
    });
}

function destroyServiceType(req,res) {

    const id = req.params.id;

    models.ServiceType.destroy({where: {id:id}}).then(result => {
       if(result){
        res.status(200).json({
            message: "ServiceType deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "ServiceType id is not in the list!!"
        });
       }
       
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong",
            error : error
        });
       
    });
}



module.exports = {
    userInput : userInput,
    showdata : showdata,
    editServiceType : editServiceType,
    destroyServiceType : destroyServiceType,
    showdataById:showdataById
}