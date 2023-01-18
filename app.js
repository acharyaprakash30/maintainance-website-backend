const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const user = require('./routes/user.route');
const service = require('./routes/service.route');
const userService = require("./routes/userService.route")
const {sequelize} = require("./models")

const app = express();
app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/user',user);
app.use('/service',service)
app.use('/userservice',userService)


sequelize.sync({}).then((result)=>{
  console.log("migration successful")
}).catch(err=>{
  console.log(err );
})




module.exports = app;
