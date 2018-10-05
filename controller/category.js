const {Router} = require("express");
const router = Router();
const categoryModel = require('../model/category')

router.get('/category', (req, res) => {
    categoryModel.find().then(data => {
        res.json({
            code:200,
            data
        })
    })
})

router.get('/category/:id', (req, res) =>{
    let {id} = req.params
    categoryModel.findById(id).then(data => {
        res.json({
            code:200,
            data
        })
    })
})

router.post('/category', async (req, res) =>{
    try{
        const {name} = req.body
        const data = await categoryModel.create({name})
        res.json({
            code:200,
            msg:'分类添加成功',
            data
        })
    }catch (err) {
        next(err)
    }
})
module.exports = router;