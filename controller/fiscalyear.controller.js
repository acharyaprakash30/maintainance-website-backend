const model = require('../models');

exports.savefiscalyear = async (req,res) =>{
    try{
        const fiscalYear = {
            year: req.body.year,
            status: req.body.status == true ? true : false 
          };
          if(req.body.status == true || req.body.status == 1){
            model.FiscalYear.update({status:false},{where:{status:true}});
          }
         model.FiscalYear.create(fiscalYear);
        return res.status(201).json({
            message:"fiscal year created sucessfully",
            data:fiscalYear
        })
    }
    catch(e){
        return res.status(500).json({
            message:"something were went wrong",
            error:err.message,
            message:"Internal Server Error"
        })
    }
    
}

exports.getfiscalyear = async (req,res) =>{
    try{
     let newFiscalyear = await model.FiscalYear.findAndCountAll(
        {
            include: [
                {
                  model: model.Order,
                  as: 'Fiscalyearorders',
                },
            ]
        }
     );
       return  res.status(200).json({
            data:newFiscalyear
        })
    }catch(err){
        res.status(500).json({
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.showfiscalyearById = async (req,res) =>{
    const fiscalyearId = req.params.id;
  
    try{
        let fiscalYearStatus = req.body.status;
        let newFiscalYear  = await model.FiscalYear.findByPk(fiscalyearId)
        res.status(200).json({
            data:newFiscalYear
        })

    }catch(err){
        res.status(500).json({
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.updatefiscalyear = async (req,res) =>{
    const fiscalyearId = req.params.id;
    const fiscalyearData = {
        year:req.body.year,
        status:req.body.status
    }
    try{
        let newfiscalyear = await model.FiscalYear.update(fiscalyearData,{where:{id:fiscalyearId}});
        res.status(201).json({
            message:"fiscal year updated sucessfully",
            data:newfiscalyear
        })

    }catch(err){
        res.status(500).json({
            error:err.message,
            message:"Internal Server Error"
        })
    }
}


exports.updateFiscalYearState = async(req, res) =>{
const fiscalYearId = req.params.id;
try{
     model.FiscalYear.findOne({where: {status: true}}).then((currentFiscalYear)=>{
       if(currentFiscalYear) {
           if(currentFiscalYear.id == fiscalYearId){
            res.status(200).json({ message: "Fiscal year activated sucessfully" });
           }else{
               model.FiscalYear.update({status: false}, {where: {id: currentFiscalYear.id}}).then((fiscalResult)=>{
                   if(fiscalResult){
                       model.FiscalYear.update({status: true}, {where: {id: fiscalYearId}}).then((result)=>{
                           if(result){
                               res.status(200).json({message: "Fiscal year activated successfully"});
                           }else {
                            res.status(400).json({ message: "Error Occured!!" });
                        }
                       })
                   }
               })
           }
       }else {
        model.FiscalYear.update({ status: true }, { where: { id: fiscalYearId } }).then((result) => {
            if (result) {
                res.status(200).json({ message: "Fiscal year activated sucessfully" });
            } else {
                res.status(400).json({ message: "Error Occured!!" });
            }
        });
    }
     })
} catch(err){
    res.status(500).json({
        error:err.message,
            message:"Internal Server Error"
    })
}
}

exports.deletefiscalyear = async (req,res) =>{
  const fiscalyearId = req.params.id;
    try{
        let newFiscalYear  = await model.FiscalYear.findByPk(fiscalyearId);
        if(newFiscalYear.status == true || newFiscalYear.status == 1){
        return res.status(400).json({
            error:"True status fiscal year can't be deleted",
            message:"True status fiscal year can't be deleted"
     })

        }
        await model.FiscalYear.destroy({where:{id:fiscalyearId}});
        res.status(200).json({
            message:"fiscalyear deleted sucessfully",
        })
       

    }catch(err){
        res.status(500).json({
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

exports.FilterByFiscalYear = async(req,res) =>{
    const fiscalId = req.body.fiscalYearId;
    try{

        let orders = model.Order.findAndCountAll({
            where: { fiscalYearId: fiscalId},
            include: [
                {
                    model: model.Customer,
                    as: "customer"
                },
                {
                    model: model.FiscalYear,
                    as: "fiscalYear"
                },
                {
                    model: model.OrderedItem,
                    required: true,
                    attributes: ["orderId", "itemId", "quantity", "itemPrice"],
                    include: {
                        model: model.Item,
                        as: "itemLists",
                        attributes: ["name", "price"],
                    },
                }
            ]
        }).then((result) => {
            if (result) {
                return res.status(200).json({
                    result
                })
            }
        });

    }catch(err){
        res.status(500).json({
            error:err.message,
            message:"Internal Server Error"
        })
    }
}