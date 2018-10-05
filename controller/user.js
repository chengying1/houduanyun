const {Router} = require("express");
const router = Router()
const userModel = require('../model/user')

router.post('/user',async (req, res, next) => {
    try {
        const {username, password, email} = req.body

        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

        if(password && password.length>=5){
            const data = await userModel.create({username, password, email,avatar})
            res.json({
                code:200,
                msg:'注册成功'
            })
        }else {
            res.json({
                msg:'密码长度不符合要求'
            })
        }

    } catch(err){
        res.json({
            code:400,
            msg:'缺少必要参数',
            err
        })
    }
})

router.post('/login',async (req, res)=>{
    try{
        const {email, password} = req.body
        const userData = await userModel.findOne({email})
        if(!userData){
            res.json({
                code:400,
                msg:'用户不存在'
            })
        }else{
            if(password&&password == userData.password){
                req.session.user = userData
                res.json({
                    code:200,
                    msg:'登录成功',
                    userData: {
                        avatar:userData.avatar,
                        email:userData.email,
                        username:userData.username,
                        desc:userData.desc
                    }
                })
            }else {
                res.json({
                    code:400,
                    msg:'密码不正确'
                })
            }
        }
    } catch(err){
        res.json({
            code:400,
            msg:err
        })
    }
})
router.get('/logout', (req, res) => {
    if(req.session.user){
        req.session.user = null
        res.json({
            code:200,
            msg:'登录退出'
        })
    }else {
        res.json({
            code:403,
            msg:'不能在未登录下退出'
        })
    }
})

module.exports = router;