const mongoose = require('mongoose'); //引入mongoose，因为数据我们要存入mongose
const Schema = mongoose.Schema;    //实例化Schema

// Create Schema   创建Schema    注册和登录时需要什么字段，就在里面写什么
const Profilechema = new Schema({
    type:{
        type:String,
    },
    describe:{
        type:String,
    },
    income:{  //收入
        type:String,
        required:true
    },
    expend:{  //支出
        type:String,
        required:true
    },
    cash:{   //现金
        type:String,
        required:true
    },
    remark:{ //备注
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// 导出,到这一步模型就创建好了，后面就在server.js里面使用就好啦
module.exports = Profile = mongoose.model("profile",Profilechema);