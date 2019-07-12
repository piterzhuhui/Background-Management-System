const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //通过配置信息来生成jwt的请求，验证这个token
opts.secretOrKey = keys.secretOrKey;



module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        // console.log(jwt_payload);
        // 在passport中已经得到了对应的内容，就可以对得到的内容进行查询
        User.findById(jwt_payload.id)
            .then(user=>{  //查询到返回一个用户
                if(user){  //判断用户是否存在
                    return done(null,user); //把user返回回去
                }

                //不存在，返回一个false
                return done(null,false);
            })
            .catch(err=>{
                console.log(err);
            })
    }));
}