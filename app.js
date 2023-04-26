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
const fiscalyearRoute = require('./routes/fiscalyear.route');
const roleRoute = require('./routes/role.route');
const {sequelize} = require("./models")
const swaggeruiexpress=require('swagger-ui-express');
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerDocs=require('./docs/swagger.docs')


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api-docs/',swaggeruiexpress.serve,swaggeruiexpress.setup(swaggerjsdoc(swaggerDocs)))

// app.use('/',(req,res)=>{
//     res.send("Welcome to maintainance website backend")
// })


app.use('/user',user);
app.use('/service',service)
app.use('/userservice',userService)
app.use('/location',location)
app.use('/payment',payment)
app.use('/category', categoryRoute);
app.use('/servicetype', serviceTypeRoute);
app.use('/store', storeRoute);
app.use('/fiscalyear', fiscalyearRoute);
app.use('/role', roleRoute);

 
// sequelize.sync({force:true}).then((result)=>{
//   console.log("migration successful")
// }).catch(err=>{
//   console.log(err );
// })



module.exports = app;
