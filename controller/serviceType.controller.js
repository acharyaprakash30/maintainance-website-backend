const models = require('../models');
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
const { catchError } = require("../middleware/catchError");



const userInput = catchError((req, res) =>{
    const serviceType = {
        name: req.body.name,
        serviceId: req.body.serviceId,
    }

    models.ServiceType.create(serviceType).then(result => {
        console.log(serviceType)
        res.status(201).json({
            message: "ServiceType created succesfully",
            result: serviceType
        });

    })
})


const showdata =catchError((req, res)=> {
    const { page = 0, size = 10 } = req.query;
    const { limit, offset } = PaginationData.getPagination(page, size);
    const { filter = "" } = req.query;
    models.ServiceType.findAndCountAll({
        limit,
        offset,
        include: [
            {
                as: "SubService",
                model: models.Service
            }
        ],
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

const showdataById =catchError((req, res)=> {
    models.ServiceType.findByPk(req.params.id).then(result => {
        res.status(201).json(result);
    })
}
)



const editServiceType =catchError((req, res)=> {

    const id = req.params.id;

    models.ServiceType.findByPk(id).then(serviceType => {
        if (serviceType) {
            const updatedServiceType = {
                name: req.body.name,
                serviceId: req.body.serviceId,
            }

            serviceType.update(updatedServiceType).then(result => {
                res.status(200).json({
                    message: "ServiceType updated succesfully",
                    serviceType: updatedServiceType
                });

            })
        } else {
            res.status(404).json({
                message: "ServiceType with id " + id + " is not valid"
            });
        }
    })
})

const destroyServiceType=catchError((req, res)=> {

    const id = req.params.id;

    models.ServiceType.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "ServiceType deleted succesfully",

            });
        } else {
            res.status(404).json({
                message: "ServiceType id is not in the list!!"
            });
        }

    })
}
)


module.exports = {
    userInput: userInput,
    showdata: showdata,
    editServiceType: editServiceType,
    destroyServiceType: destroyServiceType,
    showdataById: showdataById
}