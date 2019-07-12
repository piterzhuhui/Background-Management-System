const express = require("express"); //引入express
const mongoose = require("mongoose");//引入mongoose

const bodyParser = require("body-parser");  //引入body-parser
const passport = require("passport");       //引入passport

const users = require("./routes/api/users");//引入api Users.js
const profiles = require("./routes/api/profiles"); //引入 profiles.js

// DB config
const db = require("./config/keys").mongoURI;

const app = express();                //实例化一个app

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);  //将passport传递过去了，可以直接在passport中用

// Connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true },function(err){
    if(err){
        console.log('Connect Error'+err);
    }else{
        console.log("MongoDB Connected");
    }
})
    


app.get("/",(req,res)=>{              //设置路由

    res.send("Hello World!");

})

// 使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.port || 5000; //对应一个端口号

app.listen(port,() =>{

    console.log(`Server running on port ${port}`);

})

