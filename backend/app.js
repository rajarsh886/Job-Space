require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const ejs=require("ejs");
const morgan=require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");
//const session=require("express-session");
//const passport=require("passport");
//onst passportLocalMongoose=require("passport-local-mongoose");
var cors = require('cors');

const cookieParser = require("cookie-parser");

//import routes
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoutes = require('./routes/jobTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');




mongoose.connect(process.env.DB_LINK,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true
});

mongoose.connection.on('connecting', () => { 
  console.log('DB connecting')
 // console.log(mongoose.connection.readyState); //logs 2
});
mongoose.connection.on('connected', () => {
  console.log('DB connected');
 // console.log(mongoose.connection.readyState); //logs 1
});
mongoose.connection.on('disconnecting', () => {
  console.log('DB disconnecting');
  //console.log(mongoose.connection.readyState); // logs 3
});
mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected');
  //console.log(mongoose.connection.readyState); //logs 0
});


app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

/*app.use("/",function(req,res){
  res.send("Hello from node js");
});*/
app.use('/api',authRoutes); 
app.use('/api',userRoutes);
app.use('/api',jobTypeRoutes);
app.use('/api',jobRoute);



app.use(errorHandler);

//port
const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Server started on port 3000");
});