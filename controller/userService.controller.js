const model = require("../models")
const {Service} = model


//get userServices by id
const getUserSerivceById =async (req, res) => {
    const findUser =await model.User.findOne({
      attributes:{
        exclude:[
          "contact",
          "password",
          "gender",
        "createdAt",
        "IsAdmin",
        "updatedAt"]
      },
      include: {
        model: Service,
        as: "Service",
        attributes:{
          exclude:["userId",
          "createdAt",
          "updatedAt"]
        },
      },where:{id:req.userData.id}
    });
    if (findUser) {
      res.status(200).json({
        message: "Successfully found!!",
        result:findUser
      });
    } else {
      res.status(500).json({
        message: "Something went wrong!!",
      });
    }
  };
  
module.exports={getUserSerivceById}  
