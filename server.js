const express = require('express');
const http = require('http');
const port = 5000;
const app = require('./app');
const server = http.createServer(app);
server.listen(port,(req,res)=>{
    console.log(`Server listening at port http://localhost:${port}`);
});