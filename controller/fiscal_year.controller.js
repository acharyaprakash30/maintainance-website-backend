const models = require('../models');
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");


const userInput =catchError(async (req, res)=> {
    const fiscal_yearData = {
        year: req.body.year,
        status: false
    };

    await models.Fiscal_year.create(fiscal_yearData).then(result => {
        res.status(201).json({
            message: "Fiscal year created succesfully",
            result: fiscal_yearData
        });
    })
}
)


// function showData(req, res){

//     const id = req.params.id;

//     models.Fiscal_year.findAndCountAll().then(fiscal_year => {

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

const showData =catchError( (req, res) =>{
    const { page = 0, size = 10 } = req.query;
    const { limit, offset } = PaginationData.getPagination(page, size);
    const { filter = "" } = req.query;
    models.Fiscal_year.findAndCountAll({
        limit,
        offset,
        where: {
            [Op.or]: [
                {
                    year: {
                        [Op.like]: "%" + filter + "%",
                    },
                },
            ],
        },
    })
        .then((result) => {
            res
                .status(200)
                .json({
                    data: result.rows,
                });
        })
}
)

const editfiscalyear=catchError((req, res) =>{

    const id = req.params.id;

    models.Fiscal_year.findByPk(id).then(fiscalData => {
        if (fiscalData) {
            const updatedFiscalData = {
                year: req.body.year,
                status: req.body.status
            }

            // databasema fiscal year true vako 
            if (req.body.status == true) {
                let fiscalYearData = models.Fiscal_year.findAndCountAll({ where: { status: true } }).then(result => {
                    result.forEach(result => {
                        result.status = false;
                        result.save();
                    });


                    fiscalData.update(updatedFiscalData).then(result => {
                        res.status(200).json({
                            message: "Fiscal Year updated succesfully",
                            result: updatedFiscalData
                        });
                    })
                })
            }
            else {
                fiscalData.update(updatedFiscalData).then(result => {
                    res.status(200).json({
                        message: "Fiscal Year updated succesfully",
                        result: updatedFiscalData
                    });

                })

            }

        } else {
            res.status(404).json({
                message: "Fiscal year data with id " + id + " is not valid"
            });
        }
    })
})


const deletefiscalyear=catchError((req, res)=> {
    const id = req.params.id;

    models.Fiscal_year.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Fiscal year deleted succesfully",

            });
        } else {
            res.status(404).json({
                message: "Fiscal year id is not in the list!!"
            });
        }

    })
}
)




module.exports = {
    userInput: userInput,
    showData: showData,
    editfiscalyear: editfiscalyear,
    deletefiscalyear: deletefiscalyear


}
