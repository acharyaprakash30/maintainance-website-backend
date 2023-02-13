const express = require('express');
const path = require("path");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const user = require('./routes/user.route');
const userService = require('./routes/user-service.route');
const location = require('./routes/location.route');
const payment = require('./routes/payment.route');
const service = require('./routes/service.route');
const categoryRoute = require('./routes/category.route');
const serviceTypeRoute =  require('./routes/serviceType.route'); //pp
const storeRoute = require('./routes/store.route');
const {sequelize} = require("./models")

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/user',user);
app.use('/service',service)
app.use('/userservice',userService)
app.use('/location',location)
app.use('/payment',payment)
app.use('/category', categoryRoute);
app.use('/servicetype', serviceTypeRoute);
app.use('/store', storeRoute);


// sequelize.sync({force:true}).then((result)=>{
//   console.log("migration successful")
// }).catch(err=>{
//   console.log(err );
// })




module.exports = app;
