const models = require('../models');

const create = (req, res)=>{
    const rolecreate = {
        name : req.body.name
    }
    models.Role.create(rolecreate).then(result => {
        res.status(201).json({
            message : "Role created succesfully for user",
            result : rolecreate
        });
    }).catch(error => {
        res.status(501).json({
            message : "Something went wrong !!",
            error: error
        });
    });
}

const showAll = (req, res) => {
    models.Role.findAll().then(result => {
        res.status(201).json(result);
    }).catch(error => {
        res.status(501).json({
            message:"Something went wrong!!",
            error : error
        });
        
    });
}

const update = (req, res) => {

    const id = req.params.id;

    models.Role.findByPk(id).then(result => {
        if(result){
            const updatedRole = {
                name : req.body.name,
            }

            result.update(updatedRole).then(result => { 
                res.status(200).json({
                    message : "User Role updated succesfully",
                    User_Role : updatedRole
                });

            }).catch( error =>{
                res.status(500).json({
                    message:"something went wrong",
                    error: error
                });
            });
        }else{
            res.status(404).json({
                message : "Users Role with id " + id + " is not valid"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong!!",
            error : error
        });
    });
}

const delet =(req, res) =>{

    const id = req.params.id;

    models.Role.destroy({where: {id:id}}).then(result => {
       if(result){
        res.status(200).json({
            message: "User Role deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "Users Role id is not in the list!!"
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
    create : create,
    showAll : showAll,
    update : update,
    delet : delet
}