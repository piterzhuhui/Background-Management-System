//   用于信息接口，资金流水账
const express = require("express"); //引入express
const router = express.Router(); //实例化一个router
const passport = require("passport");

const Profile = require("../../models/Profile"); //引入数据模型


//当输入地址/test时返回数据
// $route GET api/profiles/test
// @desc 返回的请求json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "profile works"
    });
})

// $route POST api/profiles/add
// @desc 创建信息接口  ，第二个参数会验证我们的token
// @access Private
router.post("/add",passport.authenticate("jwt", {session: false}),(req,res)=>{

    const profileFields = {};
    
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile =>{
        res.json(profile);
    });

});

// $route GET api/profiles
// @desc 获取所有信息  ，第二个参数会验证我们的token
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find()
        .then(profile => {
            if(!profile){
                return res.status(404).json('没有任何内容');
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// $route GET api/profiles/:id
// @desc 获取单个信息  ，第二个参数会验证我们的token
// @access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
        .then(profile => {
            if(!profile){
                return res.status(404).json('没有任何内容');
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});



// $route POST api/profiles/edit
// @desc 编辑信息接口  ，第二个参数会验证我们的token
// @access Private
router.post("/edit/:id",passport.authenticate("jwt", {session: false}),(req,res)=>{

    const profileFields = {};
    
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile => res.json(profile));
});


// $route delete api/profiles/delete
// @desc 删除信息接口  ，第二个参数会验证我们的token
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate("jwt", {session: false}),
    (req,res) => {
        Profile.findOneAndDelete({_id:req.params.id})
        .then(profile => {
            // 删除成功后返回删除的信息
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json('删除失败！'));
    }
);



module.exports = router; //导出router