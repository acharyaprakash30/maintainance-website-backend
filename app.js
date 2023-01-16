const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const user = require('./routes/user.route');
const {sequelize} = require("./models")

const app = express();
app.use(cors());

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user',user);

sequelize.sync({}).then((result)=>{
  console.log("migration successful")
}).catch(err=>{
  console.log(err );
})




module.exports = app;
