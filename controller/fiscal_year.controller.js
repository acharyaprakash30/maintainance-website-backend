const models = require('../models');

async function userInput (req, res){
    const fiscal_yearData = {
        year : req.body.year,
        status:false
    };

   await models.Fiscal_year.create(fiscal_yearData).then(result => {
        res.status(201).json({
            message: "Fiscal year created succesfully",
            result : fiscal_yearData
        });
    }).catch(error => {
        res.status(501).json({
            message : "Something went wrong!! ",
            error : error
        });
    });
}



// function showData(req, res){

//     const id = req.params.id;

//     models.Fiscal_year.findAll().then(fiscal_year => {

//         statusData = [];

//         fiscal_year.forEach(item => {
//             if (item.id == id) {
//                 statusData.push({year: item.year ,status: true });
//             } else {
//                 statusData.push({ year : item.year, status: false });
//             }
//         });
//         res.status(201).json(statusData);   
//     }).catch(error => {
//         res.status(501).json({
//             message : "Something went wrong!! ",
//             error : error
//         });
//     });
    

// }

function showData(req, res){
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
    models.Fiscal_year.findAndCountAll({    
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


function editfiscalyear(req, res) {

    const id = req.params.id;

    models.Fiscal_year.findByPk(id).then(fiscalData => {
        if (fiscalData) {
            const updatedFiscalData = {
                year: req.body.year,
                status : req.body.status
            }
            
            // databasema fiscal year true vako 
            if(req.body.status == true){
                let fiscalYearData = models.Fiscal_year.findAll({where: {status: true} }).then(result => {
                    result.forEach(result => {
                        result.status = false;
                        result.save();
                    });
                        

                    fiscalData.update(updatedFiscalData).then(result => { 
                        res.status(200).json({
                            message : "Fiscal Year updated succesfully",
                            result : updatedFiscalData
                        });        
                    }).catch( error =>{
                        res.status(500).json({
                            message:"something went wrong",
                            error: error
                        });
                    });
                }).catch(error => {
                    console.log(error)
                    res.status(500).json({
                        message: "Something is  wrong!!",
                        error: error
                    });
                });
            }
            else {
                fiscalData.update(updatedFiscalData).then(result => { 
                    res.status(200).json({
                        message : "Fiscal Year updated succesfully",
                        result : updatedFiscalData
                    });
    
                }).catch( error =>{
                    res.status(500).json({
                        message:"something went wrong",
                        error: error
                    });
                });

            }
          
        } else {
            res.status(404).json({
                message: "Fiscal year data with id " + id + " is not valid"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!",
            error: error
        });
    });
}


function deletefiscalyear(req,res){
    const id = req.params.id;

    models.Fiscal_year.destroy({where: {id:id}}).then(result => {
       if(result){
        res.status(200).json({
            message: "Fiscal year deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "Fiscal year id is not in the list!!"
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
    showData : showData,
    editfiscalyear : editfiscalyear,
    deletefiscalyear : deletefiscalyear


}
