const models = require('../models');

function userInput(req, res){
    if (req.file) {
        var img = req.file.path;
      }
    const storeData = {
        name: req.body.name,
        image : img,
        latitude : req.body.latitude,
        longitude: req.body.longitude,
        address : req.body.address,
        userId : req.body.userId,
         
    }

    models.Store.create(storeData).then(result => {
        //console.log(storeData)
        res.status(201).json({
            message: "StoreData created succesfully",
            result : storeData
        });

    }).catch(error => {
        res.status(501).json({
            message: "Something went wrong!! ",
            error : error
        });
    });
    
}

function showdata(req, res){
    models.Store.findAll({
        include : [
            {
                model : models.User,
                as : "StoreData",
                attributes : ["id", "name", "email", "contact", "gender"]

            }
        ]
    }).then(result => {
        res.status(201).json(result);
    }).catch(error => {
        res.status(501).json({
            message:"Something went wrong!!",
            error : error
        });
        
    });
}

function editStoreData(req, res){

    const id = req.params.id;

    models.Store.findByPk(id).then(storeData => {
        if(storeData){
            const updatedStoreData = {
                name: req.body.name,
                image : req.file.path,
                latitude : req.body.latitude,
                longitude: req.body.longitude,
                address : req.body.address,
                userId : req.body.userId,      
            }

            storeData.update(updatedStoreData).then(result => { 
                res.status(200).json({
                    message : "StoreData updated succesfully",
                    result : updatedStoreData
                });

            }).catch( error =>{
                res.status(500).json({
                    message:"something went wrong",
                    error: error
                });
            });
        }else{
            res.status(404).json({
                message : "StoreData with id " + id + " is not valid"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong!!",
            error : error
        });
    });
}

function destroyStoreData(req,res) {

    const id = req.params.id;

    models.Store.destroy({where: {id:id}}).then(result => {
       if(result){
        res.status(200).json({
            message: "StoreDAta deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "StoreData id is not in the list!!"
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
    editStoreData : editStoreData,
    destroyStoreData : destroyStoreData
}