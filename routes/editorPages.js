const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Post = require('../models/post');
const path = require("path");

router.get('/index', async (req,res)=>{
    if(req.isAuthenticated){
        let posts = await Post.find()
        res.render('editorial/index', {posts:posts, count:posts.length})
    } else {
        res.redirect('/')
    }
})

router.get('/compose', async(req,res)=>{
    if(req.isAuthenticated){
        res.render('editorial/compose')
    } else {
        res.redirect('/')
    }
})

router.get('/edit/:id', async(req,res)=>{
    if(req.isAuthenticated){
        let postToEdit = await Post.findOne({_id: req.params.id})
        res.render('editorial/edit', {postToEdit:postToEdit})
    } else {
        res.redirect('/')
    }
})

router.get("/post/:postName", async(req,res)=>{
    if(req.isAuthenticated){
        try{
            let postItem = await Post.findOne({title: req.params.postName})
            if(postItem){
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('editorial/blogSingle', {
                    postItem:postItem,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            }
        } catch(err){
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
})

module.exports = router