const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Post = require("../models/post")
const router = express.Router();

router.post('/:id/submit', async(req,res)=>{
    let submit = await Post.findOneAndUpdate({_id:req.params.id}, {isSubmitted: true, isRemoved:false})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

router.post('/:id/remove', async(req,res)=>{
    let submit = await Post.findOneAndUpdate({_id:req.params.id}, {isRemoved: true ,isSubmitted: false})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

module.exports = router;