const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const user = require('./routes/user.route');
const userService = require('./routes/user-service.route');
const location = require('./routes/location.route');
const payment = require('./routes/payment.route');
const service = require('./routes/service.route');
const {sequelize} = require("./models")

const app = express();
app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/uploads',express.static('uploads'))
app.use('/user',user);
app.use('/service',service)
app.use('/userservice',userService)
app.use('/location',location)
app.use('/payment',payment)


// sequelize.sync({force:true}).then((result)=>{
//   console.log("migration successful")
// }).catch(err=>{
//   console.log(err );
// })




module.exports = app;
