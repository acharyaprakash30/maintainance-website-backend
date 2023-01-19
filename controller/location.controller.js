// const { Result } = require("express-validator");
// const model = require("../models");

// //create location

// const locationInput = (req, res) => {
//   const location = {
//     address: req.body.address,
//     userId: req.userData.id,
//   };
//   model.Location.create(location)
//     .then((Result) => {
//       res.status(200).json({
//         message: "location added successfully",
//         result: location,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Something went wrong",
//         err,
//       });
//     });
// };

// //edit location

// const editlocation = (req, res) => {
//   const editedLocation = {
//     address: req.body.address,
//   };
//   model.Location.findOne({ where: { id: req.userData.id } })
//     .then((result) => {
//       if (result) {
//         model.Location.update(editedLocation, {
//           where: { id: req.userData.id },
//         })
//           .then((update) => {
//             res.status(200).json({
//               messege: "location updated succcessfully!",
//               editedLocation,
//             });
//           })
//           .catch((err) => {
//             res.status(500).json({
//               messege: "something went wrong!",
//             });
//           });
//       } else {
//         res.status(401).json({
//           messege: "No location found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         messege: "something went wrong!",
//         err,
//       });
//     });
// };
// //delete 

// const deleteLocation = (req, res) => {
//   model.Location.destroy({ where: { id:req.} })
//     .then((result) => {
//       if (result) {
//         res.status(200).json({
//           messege: `Service ${req.params.id} deleted`,
//         });
//       } else {
//         res.status(404).json({
//           messege: `Service not found`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         messege: "Something went wrong",err
//       });
//     });
// };
