const connectToMongo = require('./db');
const express = require("express");


connectToMongo();

const app = express();
app.use(express.json());

app.use('/api',require('./route'));

app.listen(5000,()=>{
    console.log("App listning on port 5000");
})