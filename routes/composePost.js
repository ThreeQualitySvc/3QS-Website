const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Post = require("../models/post.js");
const Email = require("../models/mail.js");
const multer = require("../controllers/multer.js");
const moment = require("moment");
const router = express.Router();

const format = s => s.toLowerCase()
    .split(/\s|%20/)
    .filter(Boolean)
    .join('-');

router.post('/compose', multer.uploads.array("myPhoto", 2), async(req,res)=>{
    const newBlog = new Post({
        firstName: req.body.fname,
        title: format(req.body.title).replace(/\?.*$/, ''),
        titleNormal: req.body.title,
        lastName: req.body.lname,
        email: req.body.email,
        mood: req.body.mood,
        tags: req.body.tags,
        content: req.body.content,
        profilePhoto: req.files[0].path,
        dayPhoto: req.files[1].path,
        day: moment(Date.now()).format("MMMM, Do YYYY")
    })
    newBlog.save().then(()=>{res.redirect('/index')}).catch(err=>{res.redirect('/index')})
})

router.post('/edit/:id', multer.uploads.array("myPhoto", 2), async(req,res)=>{
    let updateObject = {
        firstName: req.body.fname,
        title: format(req.body.title),
        lastName: req.body.lname,
        email: req.body.email,
        mood: req.body.mood,
        tags: req.body.tags,
        content: req.body.content,
    }
    let newUpdate = await Post.findOneAndUpdate({_id:req.params.id}, {$set: updateObject}, )
    res.redirect('/index')
})

router.delete("/delete/:id", async(req,res)=>{
    const removePost = await Post.findOneAndDelete({_id: req.params.id})
    if(removePost){
        res.redirect('back')
    } else {
        console.log('Item does not exist')
    }
})

module.exports = router;