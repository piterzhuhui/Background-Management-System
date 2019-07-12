// @login & register   用于登录和注册
const express = require("express"); //引入express
const router = express.Router(); //实例化一个router
const bcrypt = require("bcrypt");
const User = require("../../models/User"); //引入数据模型
const grvatar = require('gravatar'); //引入gravatar
const jwt = require('jsonwebtoken'); //引入jsonwebtoken
const keys = require("../../config/keys");
const passport = require("passport");

//当输入地址/test时返回数据
// $route GET api/users/test
// @desc 返回的请求json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "login works"
    });
})

// $route POST api/users/register
// @desc 返回的请求json数据
// @access public
router.post("/register", (req, res) => {
    // console.log(req.body);
    // 查询数据库中是否拥有邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json( "邮箱已被注册"
                )
            } else {
                const avatar = grvatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });


                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                    identity:req.body.identity
                })
                //密码加密  需npm install bcrypt
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        //store hash in your password DB.
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })



})


// $route POST api/users/login
// @desc 返回token  jwt password
// @access public

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.json( "用户不存在"
                ); //return res.status(404).json({email:"用户不存在"});
            }
            //密码匹配  使用token
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        };
                        //用id和name来做一个token
                        // jwt.sign("规则", "加密名字", "过期时间", "箭头函数");
                        jwt.sign(rule, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) {
                                throw err
                            };
                            res.json({
                                success: true,
                                token: "Bearer " + token
                                //返回一个固定值+taken规则的的token
                            });
                        })
                        // res.json({msg:"success"});
                    } else {
                        return res.json( "密码错误!"
                        );
                        //return res.status(400).json({password:"密码错误!"});
                    }
                })
        })
})

// $route GET api/users/current
// @desc return current user
// @access Private
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})


module.exports = router; //导出router